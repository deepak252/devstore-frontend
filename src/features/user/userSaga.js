import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../../services/api';
import {
  getUser,
  getUserSuccess,
  getUserFailure,
  getUserProfile,
  getUserProfileFailure,
  getUserProfileSuccess,
} from './userSlice';
import { USER_API } from '../../constants/apiPath';
import { cacheUser, getCachedUser } from '../../app/cache';

// Fetch Logged In user using authToken
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
    yield put(getUserFailure(e?.message || 'Something went wrong'));
  }
}

function* getUserProfileHandler(action) {
  try {
    const { username } = action.payload;
    const response = yield call(getRequest, USER_API + `/${username}`);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getUserProfileSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error(e);
    yield put(getUserProfileFailure(e?.message || 'Something went wrong'));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getUser.type, getUserHandler),
    takeLatest(getUserProfile.type, getUserProfileHandler),
  ]);
}
