import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  };

  handleOptionOne = (event) => {
    this.setState({
      optionOne: event.target.value,
    });
  };

  handleOptionTwo = (event) => {
    this.setState({
      optionTwo: event.target.value,
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
    return (
      <div className='center'>
        <h3>Create New Quiz Question</h3>
        <form>
          <label>Which one?</label>
          <br />
          <input
            value={this.state.optionOne}
            type='text'
            className='options'
            onChange={this.handleOptionOne}
            placeholder='Enter first option'
          />
          <br />
          OR
          <br />
          <input
            value={this.state.optionTwo}
            type='text'
            className='options'
            onChange={this.handleOptionTwo}
            placeholder='Enter second option'
          />
          <button type='submit' className='btn' onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
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
