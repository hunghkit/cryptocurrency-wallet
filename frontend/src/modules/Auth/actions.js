import { createAction } from 'redux-actions';

export const ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export const loginSuccess = createAction(ACTIONS.LOGIN_SUCCESS);

export const logoutSuccess = createAction(ACTIONS.LOGOUT_SUCCESS);
