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
  createApp,
  createAppCancelled,
  createAppFailure,
  createAppSuccess,
  getApps,
  getAppsFailure,
  getAppsSuccess,
  getAppDetails,
  getAppDetailsFailure,
  getAppDetailsSuccess,
  getAppsBanner,
  getAppsBannerFailure,
  getAppsBannerSuccess,
  uploadAppPackage,
  uploadAppPackageCancelled,
  uploadAppPackageFailure,
  uploadAppPackageProgress,
  uploadAppPackageSuccess,
} from './appsSlice';
import { uploadTask } from '../../services/uploadTask';
import { APPS_API, PACKAGE_UPLOAD_API, BANNER_API } from '../../constants/apiPath';
import { getRequest, postRequest } from '../../services/api';
import store from '../../app/store';

function* getAppsHandler(action) {
  try {
    const { page = 1, searchQuery: search } = action.payload ?? {};
    let filter = yield select((state) => state.apps?.filter);
    const response = yield call(postRequest, APPS_API, {
      queryParams: {
        page,
        search,
      },
      data: filter,
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getAppsSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getAppsHandler', e);
    yield put(getAppsFailure(e?.message || 'Something went wrong'));
  }
}

function* getAppDetailsHandler(action) {
  try {
    const { appId = '' } = action.payload ?? {};
    const response = yield call(getRequest, `${APPS_API}/${appId}`);
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getAppDetailsSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getAppDetailsHandler', e);
    yield put(getAppDetailsFailure(e?.message || 'Something went wrong'));
  }
}

function* createAppHandler(action) {
  try {
    const formData = action.payload;
    // To abort the api call
    const controller = new AbortController();

    // Fork a new task to handle the API call
    const task = yield fork(
      uploadTask,
      `${APPS_API}/create`,
      {
        data: formData,
        signal: controller.signal,
      },
      function* (successResponse, error) {
        if (successResponse) {
          yield put(createAppSuccess(successResponse?.data));
        } else {
          yield put(createAppFailure(error?.message || 'Something went wrong'));
        }
      }
    );

    const [, , cancelUpload] = yield race([
      take(createAppSuccess.type),
      take(createAppFailure.type),
      take(createAppCancelled.type),
    ]);
    if (cancelUpload) {
      // abort the api call
      controller.abort();
    }
    console.log('createAppHandler end');
    cancel(task);
  } catch (e) {
    console.error('createAppHandler', e);
  }
}

function* uploadAppPackageHandler(action) {
  try {
    const formData = action.payload;
    // To abort the api call
    const controller = new AbortController();

    // Fork a new task to handle the API call
    const task = yield fork(
      uploadTask,
      PACKAGE_UPLOAD_API,
      {
        data: formData,
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const { loaded, total, progress } = progressEvent;
          store.dispatch(
            uploadAppPackageProgress({
              loaded,
              total,
              percent: Math.round(progress * 100),
            })
          );
        },
      },
      function* (successResponse, error) {
        if (successResponse) {
          yield put(uploadAppPackageSuccess(successResponse?.data));
        } else {
          yield put(uploadAppPackageFailure(error?.message || 'Something went wrong'));
        }
      }
    );

    const [, , cancelUpload] = yield race([
      take(uploadAppPackageSuccess.type),
      take(uploadAppPackageFailure.type),
      take(uploadAppPackageCancelled.type),
    ]);
    if (cancelUpload) {
      // abort the api call
      controller.abort();
    }
    console.log('uploadAppPackageHandler end');
    cancel(task);
  } catch (e) {
    console.error('uploadAppPackageHandler', e);
  }
}

function* getAppsBannerHandler(action) {
  try {
    const response = yield call(getRequest, BANNER_API, {
      queryParams: {
        category: 'apps',
      },
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getAppsBannerSuccess(response.data));
    } else {
      throw response?.data || response;
    }
  } catch (e) {
    console.error('getAppsBannerHandler', e);
    yield put(getAppsBannerFailure(e?.message || 'Something went wrong'));
  }
}

export default function* appsSaga() {
  yield all([
    takeLatest(getApps.type, getAppsHandler),
    takeLatest(getAppDetails.type, getAppDetailsHandler),
    takeLatest(createApp.type, createAppHandler),
    takeLatest(uploadAppPackage.type, uploadAppPackageHandler),
    takeLatest(getAppsBanner.type, getAppsBannerHandler),
  ]);
}

// function* uploadAppPackageHandler(action) {
//   try {
//     const formData = action.payload;
//     // To abort the api call
//     const controller = new AbortController();

//     // Fork a new task to handle the API call
//     const task = yield fork(apiCallTask, formData, controller);

//     const { success, failure, cancelUpload } = yield race({
//       success: take(uploadAppPackageSuccess.type),
//       failure: take(uploadAppPackageFailure.type),
//       cancelUpload: take(uploadAppPackageCancelled.type),
//     });
//     if (success) {
//       yield cancel(task); // Cancel the API call task
//     } else if (failure) {
//       // controller.abort();
//     } else if (cancelUpload) {
//       // abort the api call
//       controller.abort();
//     }
//   } catch (e) {
//     console.error('uploadAppPackageHandler', e);
//   }
// }

// function* uploadAppPackageHandler(action) {
//   try {
//     const formData = action.payload;

//     const response = yield call(postRequest, PACKAGE_UPLOAD_API, {
//       data: formData,
//       onUploadProgress: (progressEvent) => {
//         const { loaded, total, progress } = progressEvent;
//         store.dispatch(
//           uploadAppPackageProgress({
//             loaded,
//             total,
//             percent: Math.round(progress * 100),
//           })
//         );
//       },
//     });

//     if (response && response.status >= 200 && response.status <= 299) {
//       yield put(uploadAppPackageSuccess(response.data));
//     } else {
//       throw response?.data || response;
//     }
//   } catch (e) {
//     console.error('uploadAppPackage', e);
//     yield put(uploadAppPackageFailure(e?.message || 'Something went wrong'));
//   }
// }
