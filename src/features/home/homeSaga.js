import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../../services/api';
import {
  getFeatured,
  getFeaturedFailure,
  getFeaturedSuccess,
} from './homeSlice';
import { FEATURED_ALL_API } from '../../constants/apiPath';

function* getFeaturedHandler() {
  try {
    const response = yield call(getRequest, FEATURED_ALL_API);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getFeaturedSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getFeaturedHandler', e);
    yield put(getFeaturedFailure(e?.message || 'Something went wrong'));
  }
}

export default function* homeSaga() {
  yield all([takeLatest(getFeatured.type, getFeaturedHandler)]);
}
