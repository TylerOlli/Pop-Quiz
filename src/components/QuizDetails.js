import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/shared';
import { Card, Header, Form, Feed, Button } from 'semantic-ui-react';
import NotFound from '../components/NotFound';

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
    const { user, question, isInvalid, authedUser } = this.props;
    return (
      <div className='center top-10'>
        {isInvalid === false ? (
          <Card fluid color='teal'>
            <Card.Description>
              <Header as='h4' textAlign='center'>
                {user.name} asks:
              </Header>
            </Card.Description>
            <Card.Content className='center aligned'>
              <Header as='h6' textAlign='center'>
                Which one?
              </Header>
              <Button.Group>
                <Button
                  color='teal'
                  onClick={this.handleChange}
                  value='optionOne'
                >
                  {question.optionOne.text}
                </Button>
                <Button.Or />
                <Button
                  color='teal'
                  onClick={this.handleChange}
                  value='optionTwo'
                >
                  {question.optionTwo.text}
                </Button>
              </Button.Group>
            </Card.Content>
            <Card.Content>
              <Link to={`/results/${this.props.pollId}`}>
                <Form.Button fluid onClick={this.handleVote}>
                  Submit
                </Form.Button>
              </Link>
            </Card.Content>
            <Card.Content extra>
              <Feed>
                <Feed.Event>
                  <Feed.Label>
                    <img src={user.avatarURL} alt={user.name} />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Meta>
                      Posted by <Feed.User>{user.name}</Feed.User>
                      {authedUser === user.id && <span> (You)</span>}
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
        ) : (
          <NotFound />
        )}
        <br />
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  if (typeof question === 'undefined') {
    return {
      isInvalid: true,
      user: '',
      question: '',
    };
  }

  const userAnswer = users[authedUser].answers[id];

  return {
    pollId: id,
    question,
    user: users[question.author],
    authedUser,
    userAnswer,
    isInvalid: false,
  };
}

export default connect(mapStateToProps)(QuizDetails);
