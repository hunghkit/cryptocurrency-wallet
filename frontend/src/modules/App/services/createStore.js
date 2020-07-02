import createSagaMiddleware from 'redux-saga';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import sagas from '../saga';
import reducers from '../reducer';

const sagaMiddleware = createSagaMiddleware();

export const createStore = () => {
  let _compose = compose;

  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    _compose = composeWithDevTools;
  }

  const store = _createStore(
    reducers,
    {},
    _compose(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(sagas);

  return store;
};

export default createStore();
