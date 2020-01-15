import { combineReducers } from 'redux';

import apiReducer from './apiReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  apiData: apiReducer,
  user: userReducer
});

export default rootReducer;