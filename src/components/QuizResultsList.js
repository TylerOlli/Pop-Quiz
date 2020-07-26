import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuizResultsList extends Component {
  render() {
    const { user, question, totalVotes, yourAnswer } = this.props;
    return (
      <div className='center'>
        <div className='quiz-card'>
          <div className='quiz-user'>
            <h4>Results by {user.name} </h4>
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
            <div>
              {question.optionOne.text}
              {yourAnswer[0][1] === 'optionOne' ? (
                <span>(your choice)</span>
              ) : null}
              ({`${question.optionOne.votes.length} / ${totalVotes} votes`})
            </div>
            <div>
              {question.optionTwo.text}&nbsp;
              {yourAnswer[0][1] === 'optionTwo' ? (
                <span>(your choice)</span>
              ) : null}
              ({`${question.optionTwo.votes.length} / ${totalVotes} votes`})
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props;
  const question = questions[id];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const userAnswers = users[authedUser].answers;
  return {
    pollId: id,
    question,
    user: users[question.author],
    yourAnswer: Object.entries(userAnswers).filter((answer) => {
      return answer[0] === id;
    }),
    totalVotes,
  };
}

export default connect(mapStateToProps)(QuizResultsList);
