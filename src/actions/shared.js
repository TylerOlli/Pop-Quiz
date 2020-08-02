import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { saveAnswerQuestion, addQuestion } from '../actions/questions';
import { saveAnswerUser, addQuestionUser } from '../actions/users';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';

const AUTHED_ID = null;

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

export function handleSaveAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(saveAnswerQuestion({ authedUser, qid, answer }));
    dispatch(saveAnswerUser({ authedUser, qid, answer }));

    return saveQuestionAnswer({ authedUser, qid, answer }).catch((error) => {
      console.warn('There was an error', error);
      dispatch(saveAnswerQuestion({ authedUser, qid, answer }));
    });
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionUser(question));
    });
  };
}
