import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleSetAuthedUser } from '../actions/authedUser';
import { Menu, Image, Icon } from 'semantic-ui-react';

class Nav extends Component {
  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(handleSetAuthedUser(null));
  };

  render() {
    const { user } = this.props;

    return (
      <Menu stackable>
        <Menu.Item as={NavLink} to='/' exact activeClassName='active'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to='/leaderboard' activeClassName='active'>
          <Icon name='dashboard' />
          Leaderboard
        </Menu.Item>
        <Menu.Item as={NavLink} to='/add' activeClassName='active'>
          <Icon name='plus circle' />
          Add Question
        </Menu.Item>
        <Menu.Menu position='right'>
          {user !== null && (
            <Fragment>
              <Menu.Item>
                <Fragment>
                  <Image src={user.avatarURL} size='mini' avatar circular />
                  <span>{user.name}</span>
                </Fragment>
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                to='/'
                activeClassName='active'
                onClick={this.handleLogout}
              >
                <Icon name='sign out' />
                Logout
              </Menu.Item>
            </Fragment>
          )}
        </Menu.Menu>
      </Menu>
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
