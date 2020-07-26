import React from 'react';
import Quiz from '../components/Quiz';

const QuizList = (props) => {
  const { questions } = props;
  return (
    <div>
      {questions.map((question) => (
        <Quiz key={question.id} id={question.id} />
      ))}
    </div>
  );
};

export default QuizList;
