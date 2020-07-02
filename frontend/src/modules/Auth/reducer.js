import Cookie from 'js-cookie';
import { handleActions, combineActions } from 'redux-actions';
import { loginSuccess, logoutSuccess } from './actions';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export const reducer = handleActions(
  {
    [combineActions(loginSuccess)]: (state, { payload: currentUser }) => ({
      ...state,
      currentUser,
      isAuthenticated: !!currentUser,
    }),
    [combineActions(logoutSuccess)]: () => {
      Cookie.remove('token');
      return initialState;
    },
  },
  initialState,
);

export default reducer;
