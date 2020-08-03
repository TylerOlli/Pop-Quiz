import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Header, Feed, Button } from 'semantic-ui-react';

class Quiz extends Component {
  render() {
    const { question, user, id, authedUser } = this.props;
    return (
      <Card fluid color='teal'>
        <Card.Description>
          <Header as='h4' textAlign='center'>
            Pop Quiz
          </Header>
        </Card.Description>
        <Card.Content>
          <p>{question.optionOne.text}</p>
          <p>{question.optionTwo.text}</p>
          <Link to={`/questions/${id}`}>
            <Button fluid primary>
              View Quiz
            </Button>
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

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
    authedUser,
  };
}

export default connect(mapStateToProps)(Quiz);
