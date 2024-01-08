import { all } from 'redux-saga/effects';
import metadataSaga from '../features/metadata/metadataSaga';
import authSaga from '../features/auth/authSaga';
import userSaga from '../features/user/userSaga';
import appsSaga from '../features/apps/appsSaga';
import homeSaga from '../features/home/homeSaga';

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), metadataSaga(), appsSaga(), homeSaga()]);
}
