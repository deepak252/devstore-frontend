import { all, call, put, takeLatest } from 'redux-saga/effects';
import { postRequest } from '../../services/api';
import { cacheAuthToken, cacheUser } from '../../app/cache';
import { SIGN_IN_API, SIGN_UP_API } from '../../constants/apiPath';
import {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
} from './authSlice';

function* signInHandler(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(postRequest, SIGN_IN_API, {
      data: { email, password },
    });
    if (response && response.status >= 200 && response.status <= 299) {
      cacheAuthToken(response.data?.data?.token);
      cacheUser(response.data?.data?.user);
      yield put(signInSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error(e.message);
    yield put(signInFailure(e.message || 'Something went wrong'));
  }
}

function* signUpHandler(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(postRequest, SIGN_UP_API, {
      data: { email, password },
    });
    if (response && response.status >= 200 && response.status <= 299) {
      cacheAuthToken(response.data?.data?.token);
      cacheUser(response.data?.data?.user);
      yield put(signUpSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error(e);
    yield put(signUpFailure(e.message || 'Something went wrong'));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signIn.type, signInHandler),
    takeLatest(signUp.type, signUpHandler),
  ]);
}
