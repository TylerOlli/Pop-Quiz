import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/App.css';
import { handleInitialData } from '../actions/shared';
import Home from '../components/Home';
import Nav from '../components/Nav';
import Login from '../components/Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.props.authed === true ? (
            <Fragment>
              <Route path='/' component={Login} />
            </Fragment>
          ) : (
            <Fragment>
              <Nav authedUser={this.props.authedUser} />
              <Route
                path='/'
                authedUser={this.props.authedUser}
                exact
                component={Home}
              />
            </Fragment>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authed: authedUser === null,
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
