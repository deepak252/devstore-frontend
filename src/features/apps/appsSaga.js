import {
  all,
  put,
  takeLatest,
  race,
  take,
  cancel,
  fork,
} from 'redux-saga/effects';
import {
  createApp,
  createAppCancelled,
  createAppFailure,
  createAppSuccess,
  uploadApp,
  uploadAppCancelled,
  uploadAppFailure,
  uploadAppProgress,
  uploadAppSuccess,
} from './appsSlice';
import { uploadTask } from '../../services/uploadTask';
import { APPS_API, APP_UPLOAD_API } from '../../constants/apiPath';
import store from '../../app/store';

function* createAppHandler(action) {
  try {
    const formData = action.payload;
    // To abort the api call
    const controller = new AbortController();

    // Fork a new task to handle the API call
    const task = yield fork(
      uploadTask,
      APPS_API,
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

function* uploadAppHandler(action) {
  try {
    const formData = action.payload;
    // To abort the api call
    const controller = new AbortController();

    // Fork a new task to handle the API call
    const task = yield fork(
      uploadTask,
      APP_UPLOAD_API,
      {
        data: formData,
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const { loaded, total, progress } = progressEvent;
          store.dispatch(
            uploadAppProgress({
              loaded,
              total,
              percent: Math.round(progress * 100),
            })
          );
        },
      },
      function* (successResponse, error) {
        if (successResponse) {
          yield put(uploadAppSuccess(successResponse?.data));
        } else {
          yield put(uploadAppFailure(error?.message || 'Something went wrong'));
        }
      }
    );

    const [, , cancelUpload] = yield race([
      take(uploadAppSuccess.type),
      take(uploadAppFailure.type),
      take(uploadAppCancelled.type),
    ]);
    if (cancelUpload) {
      // abort the api call
      controller.abort();
    }
    console.log('uploadAppHandler end');
    cancel(task);
  } catch (e) {
    console.error('uploadAppHandler', e);
  }
}

export default function* appsSaga() {
  yield all([
    takeLatest(createApp.type, createAppHandler),
    takeLatest(uploadApp.type, uploadAppHandler),
  ]);
}

// function* uploadAppHandler(action) {
//   try {
//     const formData = action.payload;
//     // To abort the api call
//     const controller = new AbortController();

//     // Fork a new task to handle the API call
//     const task = yield fork(apiCallTask, formData, controller);

//     const { success, failure, cancelUpload } = yield race({
//       success: take(uploadAppSuccess.type),
//       failure: take(uploadAppFailure.type),
//       cancelUpload: take(uploadAppCancelled.type),
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
//     console.error('uploadAppHandler', e);
//   }
// }

// function* uploadAppHandler(action) {
//   try {
//     const formData = action.payload;

//     const response = yield call(postRequest, APP_UPLOAD_API, {
//       data: formData,
//       onUploadProgress: (progressEvent) => {
//         const { loaded, total, progress } = progressEvent;
//         store.dispatch(
//           uploadAppProgress({
//             loaded,
//             total,
//             percent: Math.round(progress * 100),
//           })
//         );
//       },
//     });

//     if (response && response.status >= 200 && response.status <= 299) {
//       yield put(uploadAppSuccess(response.data));
//     } else {
//       throw response?.data || response;
//     }
//   } catch (e) {
//     console.error('uploadApp', e);
//     yield put(uploadAppFailure(e?.message || 'Something went wrong'));
//   }
// }
