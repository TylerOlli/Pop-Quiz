import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Feed, Grid, Segment, Button } from 'semantic-ui-react';

class Quiz extends Component {
  render() {
    const { question, user, id, authedUser } = this.props;
    return (
      <div>
        <Card fluid color='teal'>
          <Card.Description>
            <Grid columns={2} relaxed>
              <Grid.Column>
                <Segment basic textAlign='center'>
                  {question.optionOne.text}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment basic textAlign='center'>
                  {question.optionTwo.text}
                </Segment>
              </Grid.Column>
            </Grid>
          </Card.Description>
          <Card.Content>
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
      </div>
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
