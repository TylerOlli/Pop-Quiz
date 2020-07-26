import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizList from '../components/QuizList';
import QuizResultsList from '../components/QuizResultsList';

class Home extends Component {
  render() {
    return (
      <div>
        <div className='center'>
          <QuizList
            key='unansweredQuestions'
            questions={this.props.unansweredQuestions}
          />
        </div>
        <div className='center'>
          {this.props.answeredQuestions.map((answer) => (
            <QuizResultsList key={answer.id} id={answer.id} />
          ))}
        </div>
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
