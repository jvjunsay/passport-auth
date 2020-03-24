import { AUTH_USER, AUTH_ERROR } from './types';
import api from '../api/axios';
import history from '../history';

export const signup = payload => async (dispatch, getState) => {
  try {
    const response = await api.post('/api/signup', payload);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    window.localStorage.setItem('mtoken', response.data.token);
    history.push('/feature');
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email in use'
    });
  }
};

export const signin = payload => async (dispatch, getState) => {
  try {
    const response = await api.post('/api/signin', payload);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    window.localStorage.setItem('mtoken', response.data.token);
    history.push('/feature');
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login creadentials'
    });
  }
};

export const currentUser = payload => async (dispatch, getState) => {
  try {
    const response = await api.get('/api/currentuser?token=' + payload.token);
    console.log(response.data);
    dispatch({
      type: AUTH_USER,
      payload: response.data
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const googleSignin = payload => async (dispatch, getState) => {
  try {
    const response = await api.get('/auth/google');
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    window.localStorage.setItem('mtoken', response.data.token);
    history.push('/feature');
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login creadentials'
    });
  }
};

export const signout = () => {
  window.localStorage.removeItem('mtoken');
  return {
    type: AUTH_USER,
    payload: ''
  };
};
