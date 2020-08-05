import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import { Card, Header, Feed } from 'semantic-ui-react';
import NotFound from '../components/NotFound';

class QuizResults extends Component {
  render() {
    const {
      user,
      question,
      totalVotes,
      yourAnswer,
      authedUser,
      isInvalid,
    } = this.props;
    return (
      <Fragment>
        {isInvalid === false ? (
          <div className='quiz-results'>
            <Card fluid color='teal'>
              <Card.Description>
                <Header as='h4' textAlign='center'>
                  Quiz Results
                </Header>
              </Card.Description>
              <Card.Content>
                <b>Which one?</b>
                <div className='results'>
                  {question.optionOne.text}
                  {yourAnswer[0] === 'optionOne' ? (
                    <span>(your choice)</span>
                  ) : null}
                  <Line
                    percent={
                      (question.optionOne.votes.length / totalVotes) * 100
                    }
                    strokeWidth='1'
                    strokeColor='#4b0082'
                  />
                  ({`${question.optionOne.votes.length} / ${totalVotes} votes`})
                </div>
                <div className='results'>
                  {question.optionTwo.text}
                  {yourAnswer[0] === 'optionTwo' ? (
                    <span>(your choice)</span>
                  ) : null}
                  <Line
                    percent={
                      (question.optionTwo.votes.length / totalVotes) * 100
                    }
                    strokeWidth='1'
                    strokeColor='#4b0082'
                  />
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
          </div>
        ) : (
          <NotFound />
        )}
      </Fragment>
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
    authedUser,
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
