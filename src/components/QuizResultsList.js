import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Feed } from 'semantic-ui-react';

class QuizResultsList extends Component {
  render() {
    const { user, question, totalVotes, yourAnswer, authedUser } = this.props;
    return (
      <Card fluid color='teal'>
        <Card.Description>
          <Header as='h4' textAlign='center'>
            Results
          </Header>
        </Card.Description>
        <Card.Content>
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
        </Card.Content>
        <Card.Content extra>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src={user.avatarURL} alt={user.name} />
              </Feed.Label>
              <Feed.Content>
                <Feed.Meta>
                  Posted by{' '}
                  <Feed.User>
                    {user.name}
                    {authedUser === user.id && <span> (You)</span>}
                  </Feed.User>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
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
