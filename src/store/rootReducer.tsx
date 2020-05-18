import { combineReducers } from 'redux';

//csutom imports below
import userDataReducer from '../reducers/userDataReducer';

const rootReducer = combineReducers({
  userDataReducer
});

export default rootReducer;
