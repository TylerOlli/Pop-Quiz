import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizList from '../components/QuizList';
import QuizResultsList from '../components/QuizResultsList';
import { Tab } from 'semantic-ui-react';

class Home extends Component {
  render() {
    const panes = [
      {
        menuItem: 'Unanswered',
        render: () => (
          <Tab.Pane attached={false}>
            <QuizList
              key='unansweredQuestions'
              questions={this.props.unansweredQuestions}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Answered',
        render: () => (
          <Tab.Pane attached={false}>
            {this.props.answeredQuestions.map((answer) => (
              <QuizResultsList key={answer.id} id={answer.id} />
            ))}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }) {
  const userAnswers = users[authedUser].answers;
  return {
    answeredQuestions: Object.values(questions)
      .filter((question) => {
        return Object.keys(userAnswers).includes(question.id);
      })
      .sort((a, b) => b.timestamp - a.timestamp),
    unansweredQuestions: Object.values(questions)
      .filter((question) => {
        return !Object.keys(userAnswers).includes(question.id);
      })
      .sort((a, b) => b.timestamp - a.timestamp),
  };
}

export default connect(mapStateToProps)(Home);
