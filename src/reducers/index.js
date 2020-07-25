import { combineReducers } from 'redux';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';

export default combineReducers({
  authedUser,
  users,
});
