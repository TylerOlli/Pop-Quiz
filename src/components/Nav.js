import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleSetAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(handleSetAuthedUser(null));
  };

  render() {
    const { user } = this.props;

    return (
      <div className='center'>
        <NavLink
          className='nav-item'
          to='/'
          exact
          activeClassName='active-nav-item'
        >
          Home
        </NavLink>
        <div className='nav-user'>
          <div>
            <img className='avatar' alt={user.id} src={user.avatarURL} />
            <span className='username'>{user.name}</span>
            <button className='btn' onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { authedUser }) {
  const user = users[authedUser];
  return {
    user,
  };
}

export default connect(mapStateToProps)(Nav);
