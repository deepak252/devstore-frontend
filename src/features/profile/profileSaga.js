import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../../services/api';
import {
  getProfile,
  getProfileSuccess,
  getProfileFailure,
} from './profileSlice';
import { USER_API } from '../../constants/apiPath';

function* getProfileHandler(action) {
  try {
    const { username } = action.payload;
    const response = yield call(getRequest, USER_API + `/${username}`);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getProfileSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getProfileHandler', e);
    yield put(getProfileFailure(e?.message || 'Something went wrong'));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getProfile.type, getProfileHandler),
  ]);
}
