import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser';

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
      <div class='center'>
        <h1>Pop Quiz</h1>
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
        <br />
        <button className='login-btn' onClick={this.handleLogin}>
          Login
        </button>
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
