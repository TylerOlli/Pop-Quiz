import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Quiz extends Component {
  render() {
    const { question, user, id } = this.props;
    return (
      <div>
        <div className='quiz-card'>
          <div className='quiz-user'>
            <h4>{user.name} wants to know:</h4>
          </div>
          <div>
            <img
              className='quiz-card-avatar'
              alt={user.avatarURL}
              src={user.avatarURL}
            />
          </div>
          <div>
            <b>Which one?</b>
            <p className='center'>{question.optionOne.text}</p>
            <p className='center'>{question.optionTwo.text}</p>
          </div>
          <Link to={`/questions/${id}`}>
            <button className='btn'>View Quiz</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
  };
}

export default connect(mapStateToProps)(Quiz);
