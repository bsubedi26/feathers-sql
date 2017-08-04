import rootReducer from '../reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk' // no changes here 😀

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); 
  return {
    ...createStore(rootReducer,
      applyMiddleware(createLogger(), promiseMiddleware(), thunk, sagaMiddleware )),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;