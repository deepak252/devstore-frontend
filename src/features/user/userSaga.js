import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../../services/api';
import { getUser, getUserSuccess, getUserFailure } from './userSlice';
import { USER_API } from '../../constants/apiPath';
import { cacheUser, getCachedUser } from '../../app/cache';

function* getUserHandler() {
  try {
    const cachedUser = getCachedUser();
    if (cachedUser) {
      yield put(getUserSuccess({ data: cachedUser }));
    }
    const response = yield call(getRequest, USER_API);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getUserSuccess(response.data));
      cacheUser(response.data?.data);
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error(e);
    yield put(getUserFailure(e.message || 'Something went wrong'));
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUser.type, getUserHandler)]);
}
