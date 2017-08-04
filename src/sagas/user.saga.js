import { takeLatest } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import feathers from '../store/configureFeathers';
import services from '../store/configureServices';
import * as types from '../constants/actionTypes';

function* _userCreateSaga({ payload }) {
  const userService = feathers.service('users');

  // this.props.dispatch(services.users.create({email, password}))
  try {
    const users = yield userService.create(payload);
    // const users = yield put(services.users.create(payload));
    console.log('users ', users)
    // users.then(res => console.log('res ',res))
    // yield put({ type: 'USER_CREATE_SUCCESS', payload: users });
  } catch (error) {
    console.log('err', error)
    yield put({ type: 'USER_CREATE_ERROR', payload: error });
    
  }
}

function* _userLoginSaga({ payload }) {
  try {
    const users = yield feathers.authenticate(payload);
    console.log(users)
    yield put({ type: 'USER_LOGIN_SUCCESS', payload: users });
  } catch (error) {
    console.log('err', error)
    yield put({ type: 'USER_LOGIN_ERROR', payload: error });
    
  }
  
}


export function* watchUserLogin(payload) {
  yield takeLatest(types.USER_LOGIN, _userLoginSaga);
}

export function* watchUserCreate(payload) {
  yield takeLatest(types.USER_CREATE, _userCreateSaga);
}