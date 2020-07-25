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
      <div>
        <h3 className='login-heading'>Pop Quiz</h3>
        <h3>Sign in</h3>
        <select
          value={this.state.selectedOption}
          onChange={this.handleOnChange}
        ></select>
        <br />
        <button className='login-btn' onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
