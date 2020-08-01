import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/shared';

class QuizDetails extends Component {
  state = {
    option: '',
  };

  handleChange = (event) => {
    this.setState({
      option: event.target.value,
    });
  };

  handleVote = (event) => {
    const { dispatch, authedUser, pollId } = this.props;
    const answer = this.state.option;
    const qid = pollId;
    dispatch(handleSaveAnswer({ authedUser, qid, answer }));
  };

  handleSetAnswer = () => {
    const { userAnswer } = this.props;
    if (userAnswer !== null) {
      this.setState({
        option: this.props.userAnswer,
      });
    }
  };

  componentDidMount() {
    this.handleSetAnswer();
  }

  render() {
    const { user, question } = this.props;
    return (
      <div className='center top-10'>
        <div className='poll-card'>
          <div className='poll-user'>
            <h4>{user.name} wants to know:</h4>
          </div>
          <div>
            <img
              className='poll-card-avatar'
              alt={user.avatarURL}
              src={user.avatarURL}
            />
          </div>
          <div>
            <b>Which one?</b>
            <form>
              <input
                type='radio'
                checked={this.state.option === 'optionOne'}
                name='options'
                value='optionOne'
                onChange={this.handleChange}
              />{' '}
              {question.optionOne.text}
              <br />
              <input
                type='radio'
                checked={this.state.option === 'optionTwo'}
                name='options'
                value='optionTwo'
                onChange={this.handleChange}
              />{' '}
              {question.optionTwo.text}
            </form>
          </div>
          <Link to={`/results/${this.props.pollId}`}>
            <button onClick={this.handleVote} className='btn'>
              Submit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;

  const question = questions[id];

  const userAnswer = users[authedUser].answers[id];

  return {
    pollId: id,
    question,
    user: users[question.author],
    authedUser,
    userAnswer,
  };
}

export default connect(mapStateToProps)(QuizDetails);
