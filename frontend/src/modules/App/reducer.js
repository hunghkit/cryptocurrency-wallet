import { combineReducers } from 'redux';

import { reducer as auth } from '../Auth';

export default combineReducers({
  auth,
});
