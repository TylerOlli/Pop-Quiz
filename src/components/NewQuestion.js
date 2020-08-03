import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Header, Form, Card } from 'semantic-ui-react';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  };

  handleChanges = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch, authedUser } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo, authedUser));
    this.props.history.push('/');
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <div className='new-question'>
        <Card fluid color='teal'>
          <Card.Description>
            <Header as='h2' textAlign='center'>
              New Quiz Question
            </Header>
          </Card.Description>
          <Card.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  label='Option One'
                  name='optionOne'
                  value={this.state.optionOne}
                  placeholder='Enter First Option'
                  onChange={this.handleChanges}
                />
                <Form.Input
                  label='Option Two'
                  name='optionTwo'
                  value={this.state.optionTwo}
                  placeholder='Enter Second Option'
                  onChange={this.handleChanges}
                />
              </Form.Group>
              <Form.Group unstackable widths={1}>
                <Form.Button
                  content='Add New Question'
                  disabled={optionOne === '' || optionTwo === ''}
                />
              </Form.Group>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
