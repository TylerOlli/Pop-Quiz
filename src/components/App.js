import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/App.css';
import { handleInitialData } from '../actions/shared';
import Home from '../components/Home';
import Nav from '../components/Nav';
import Login from '../components/Login';
import QuizDetails from '../components/QuizDetails';
import QuizResults from '../components/QuizResults';
import Leaderboard from '../components/Leaderboard';
import NewQuestion from '../components/NewQuestion';

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
              <Route path='/questions/:id' exact component={QuizDetails} />
              <Route path='/results/:id' exact component={QuizResults} />
              <Route path='/leaderboard' exact component={Leaderboard} />
              <Route path='/add' exact component={NewQuestion} />
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
