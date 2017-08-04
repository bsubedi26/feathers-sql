import { fork, all } from 'redux-saga/effects';
import { watchSearchMedia } from './media.saga';
import { watchUserLogin, watchUserCreate } from './user.saga';

// Here, we register our watcher saga(s) and export as a single generator 
// function as our root Saga.
export default function* rootSaga() {
  yield all([
    fork(watchSearchMedia),
    fork(watchUserLogin),
    fork(watchUserCreate),
  ])
}