import {
  all,
  put,
  takeLatest,
  race,
  take,
  cancel,
  fork,
  call,
  select,
} from 'redux-saga/effects';
import {
  createWebsite,
  createWebsiteCancelled,
  createWebsiteFailure,
  createWebsiteSuccess,
  getWebsites,
  getWebsitesFailure,
  getWebsitesSuccess,
  getWebsiteDetails,
  getWebsiteDetailsFailure,
  getWebsiteDetailsSuccess,
  getWebsitesBanner,
  getWebsitesBannerFailure,
  getWebsitesBannerSuccess,
} from './websitesSlice';
import { uploadTask } from '../../services/uploadTask';
import { BANNER_API, WEBSITES_API } from '../../constants/apiPath';
import { getRequest, postRequest } from '../../services/api';

function* getWebsitesHandler(action) {
  try {
    const { page = 1, searchQuery: search } = action.payload ?? {};
    let filter = yield select((state) => state.websites?.filter);
    const response = yield call(postRequest, WEBSITES_API, {
      queryParams: {
        page,
        search,
      },
      data: filter,
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getWebsitesSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getWebsitesHandler', e);
    yield put(getWebsitesFailure(e?.message || 'Something went wrong'));
  }
}

function* getWebsiteDetailsHandler(action) {
  try {
    const { websiteId = '' } = action.payload ?? {};
    const response = yield call(getRequest, `${WEBSITES_API}/${websiteId}`);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getWebsiteDetailsSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getWebsiteDetailsHandler', e);
    yield put(getWebsiteDetailsFailure(e?.message || 'Something went wrong'));
  }
}

function* createWebsiteHandler(action) {
  try {
    const formData = action.payload;
    // To abort the api call
    const controller = new AbortController();

    // Fork a new task to handle the API call
    const task = yield fork(
      uploadTask,
      `${WEBSITES_API}/create`,
      {
        data: formData,
        signal: controller.signal,
      },
      function* (successResponse, error) {
        if (successResponse) {
          yield put(createWebsiteSuccess(successResponse?.data));
        } else {
          yield put(createWebsiteFailure(error?.message || 'Something went wrong'));
        }
      }
    );

    const [, , cancelUpload] = yield race([
      take(createWebsiteSuccess.type),
      take(createWebsiteFailure.type),
      take(createWebsiteCancelled.type),
    ]);
    if (cancelUpload) {
      // abort the api call
      controller.abort();
    }
    console.log('createWebsiteHandler end');
    cancel(task);
  } catch (e) {
    console.error('createWebsiteHandler', e);
  }
}

function* getWebsitesBannerHandler(action) {
  try {
    const response = yield call(getRequest, BANNER_API, {
      queryParams: {
        category: 'websites',
      },
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getWebsitesBannerSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getWebsitesBannerHandler', e);
    yield put(getWebsitesBannerFailure(e?.message || 'Something went wrong'));
  }
}

export default function* websitesSaga() {
  yield all([
    takeLatest(getWebsites.type, getWebsitesHandler),
    takeLatest(getWebsiteDetails.type, getWebsiteDetailsHandler),
    takeLatest(createWebsite.type, createWebsiteHandler),
    takeLatest(getWebsitesBanner.type, getWebsitesBannerHandler),
  ]);
}

