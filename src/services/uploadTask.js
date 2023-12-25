import { call } from 'redux-saga/effects';
import { postRequest } from './api';

export function* uploadTask(
  endpoint = '',
  { queryParams, data, headers = {}, signal, onUploadProgress, ...args } = {},
  cb = function* (success, error) {},
) {
  try {
    const response = yield call(postRequest, endpoint, {
      data,
      queryParams,
      headers,
      onUploadProgress,
      signal,
      ...args
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield cb(response, null);
    } else if (!signal?.aborted) { // if upload not cancelled
      throw response?.data || response;
    }
  } catch (e) {
    console.error('uploadTask error', e);
    yield yield cb(null, e);
  }
}
