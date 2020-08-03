import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Feed } from 'semantic-ui-react';

class Leaderboard extends Component {
  render() {
    const { leaders } = this.props;
    return (
      <div className='leaderboard'>
        <Header as='h2' textAlign='center'>
          Leaderboard
        </Header>
        <Card.Group>
          {leaders.map((user, index) => (
            <Card fluid color='teal' key={user.leaderId}>
              <Card.Content extra>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                      <img src={user.avatarURL} alt={user.name} />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Meta>
                        <Feed.User>{user.name}</Feed.User>
                      </Feed.Meta>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
              <Card.Content>
                <b>Score: {user.score}</b>
                <p>Answered Questions: {user.answered}</p>
                <p>Created Questions: {user.questions}</p>
                <br />
                <p className='center'></p>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
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
