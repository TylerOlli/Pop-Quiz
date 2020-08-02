export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_ANSWER_USER = 'SAVE_ANSWER_USER';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveAnswerUser(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestionUser(question) {
  return {
    type: ADD_QUESTION_USER,
    question,
  };
}
