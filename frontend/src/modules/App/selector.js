import { createSelector } from 'reselect';

const getAuth = (state) => state.auth;

export const getUser = createSelector(getAuth, (auth) => auth.currentUser);

export const getAuthenticated = createSelector(
  getAuth,
  (auth) => auth.isAuthenticated,
);
