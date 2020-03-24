import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: AuthReducer,
  form: formReducer
});
