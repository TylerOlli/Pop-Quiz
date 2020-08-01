export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_QUESTION = 'SAVE_ANSWER_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveAnswerQuestion(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
