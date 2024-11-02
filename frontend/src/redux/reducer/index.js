import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskreducer.js';
import authReducer from './authreducer.js';


const rootReducer = combineReducers({
  auth:authReducer,
  task:taskReducer,
});

export default rootReducer;