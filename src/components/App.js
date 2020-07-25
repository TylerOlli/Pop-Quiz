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
          <Route path='/' component={Login} />
        </Fragment>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
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
