import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
    });
  };
}
