import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  render() {
    const { leaders } = this.props;
    return (
      <div className='center'>
        <h3>Leaderboard</h3>
        {leaders.map((user, index) => (
          <div key={user.leaderId}>
            <div className='user'>
              <h4>{user.leaderName} asks:</h4>
            </div>
            <div>
              <img
                className='avatar'
                alt={user.avatarURL}
                src={user.avatarURL}
              />
            </div>
            <div>
              <b>Score: {user.score}</b>
              <p>Answered Questions: {user.answered}</p>
              <p>Created Questions: {user.questions}</p>
              <br />
              <p className='center'></p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ questions, users }) {
  const leaders = Object.keys(users).map((userId) => ({
    name: users[userId].name,
    leaderId: userId,
    leaderName: users[userId].name,
    avatarURL: users[userId].avatarURL,
    score:
      Object.keys(users[userId].answers).length +
      Object.keys(users[userId].questions).length,
    answered: Object.keys(users[userId].answers).length,
    questions: Object.keys(users[userId].questions).length,
  }));

  return {
    questions: Object.values(questions),
    leaders: leaders.sort(
      (a, b) => b.answered + b.questions - (a.answered + a.questions)
    ),
  };
}

export default connect(mapStateToProps)(Leaderboard);
