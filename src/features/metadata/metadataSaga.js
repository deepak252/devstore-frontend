import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getRequest } from '../../services/api';
import {
  getMetadata,
  getMetadataFailure,
  getMetadataSuccess,
} from './metadataSlice';
import { METADATA_API } from '../../constants/apiPath';
import { cacheMetadata, getCachedMetadata } from '../../app/cache';

function* getMetadataHandler() {
  try {
    const cachedMetadata = getCachedMetadata();
    if (cachedMetadata) {
      yield put(getMetadataSuccess({ data: cachedMetadata }));
    }
    const response = yield call(getRequest, METADATA_API);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getMetadataSuccess(response.data));
      cacheMetadata(response.data?.data);
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error(e);
    yield put(getMetadataFailure(e?.message || 'Something went wrong'));
  }
}

export default function* userSaga() {
  yield all([takeLatest(getMetadata.type, getMetadataHandler)]);
}
