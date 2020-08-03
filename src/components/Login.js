import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser';
import { Header, Card, Form } from 'semantic-ui-react';

class Login extends Component {
  state = {
    selectedOption: 'lolaramirez',
  };

  handleOnChange = (e) => {
    const optionValue = e.target.options[e.target.selectedIndex].id;
    this.setState((currentState) => ({
      selectedOption: optionValue,
    }));
  };

  handleLogin = (e) => {
    const { dispatch } = this.props;
    dispatch(handleSetAuthedUser(this.state.selectedOption));
  };

  render() {
    const { options } = this.props;

    return (
      <div className='center'>
        <Header as='h1'>Login Required</Header>
        <Header as='h3'>Select a user to login</Header>
        <p>
          Only logged users can take quizes, submit new quizes or view
          leaderboards.
        </p>
        <Card.Group>
          <select
            value={this.state.selectedOption}
            onChange={this.handleOnChange}
          >
            {options.map((option) => (
              <option key={option.value} id={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Form.Button fluid onClick={this.handleLogin}>
            Login
          </Form.Button>
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    options: Object.values(users).map((user) => {
      return { value: user.id, label: user.name };
    }),
  };
}

export default connect(mapStateToProps)(Login);
