import React, { Component } from 'react';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';

// show poll results
class QuizResults extends Component {
  render() {
    const { user, question, totalVotes, yourAnswer, isInvalid } = this.props;
    return (
      <div className='center'>
        {isInvalid === false ? (
          <div>
            <div className='user'>
              <h4>Results by {user.name} </h4>
            </div>
            <div>
              <img
                className='avatar'
                alt={user.avatarURL}
                src={user.avatarURL}
              />
            </div>
            <div>
              <b>Which one?</b>
              <div>
                {question.optionOne.text}
                {yourAnswer[0] === 'optionOne' ? (
                  <span>(your choice)</span>
                ) : null}
                <Line
                  percent={(question.optionOne.votes.length / totalVotes) * 100}
                  strokeWidth='1'
                  strokeColor='#4b0082'
                />
                ({`${question.optionOne.votes.length} / ${totalVotes} votes`})
              </div>
              <div>
                {question.optionTwo.text}
                {yourAnswer[0] === 'optionTwo' ? (
                  <span>(your choice)</span>
                ) : null}
                <Line
                  percent={(question.optionTwo.votes.length / totalVotes) * 100}
                  strokeWidth='1'
                  strokeColor='#4b0082'
                />
                ({`${question.optionTwo.votes.length} / ${totalVotes} votes`})
              </div>
            </div>
          </div>
        ) : (
          <div>Test</div>
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
    isInvalid: false,
  };
}

export default connect(mapStateToProps)(QuizResults);
