import { createSlice } from '@reduxjs/toolkit';
import { TOAST_INITIAL_DATA, TOAST_TYPE } from '../../constants';

const formDataInitialState = {
  name: '',
  description: '',
  categories: [],
  sourceCode: '',
  isSourceCodePublic: true,
  isPrivate: false,
  isIos: false,
  attachmentApp: null, // File Instance
  attachmentIcon: null,
  attachmentImages: [],
  attachmentVideo: null,
};

const initialState = {
  topApps: [],
  isLoading: false,
  isCreateAppFormOpen: false,
  isCreateAppFormMinimize: false,
  createAppFormData: formDataInitialState,
  isLoadingCreateAppForm: false,
  createAppError: null,
  uploadedAppInfo: null,
  isUploadingApp: false,
  uploadAppProgress: null,
  uploadAppError: null,
  toastData: TOAST_INITIAL_DATA,
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    getApps: (state, action) => {},
    getAppsSuccess: (state, action) => {},
    getAppsFailure: (state, action) => {},
    toggleCreateAppFormOpen: (state) => {
      state.isCreateAppFormOpen = !state.isCreateAppFormOpen;
      if (!state.isCreateAppFormOpen) {
        // Form Closed
        state.isCreateAppFormMinimize = false;
        state.createAppFormData = formDataInitialState;
      }
    },
    toggleCreateAppFormMinimize: (state) => {
      state.isCreateAppFormMinimize = !state.isCreateAppFormMinimize;
    },
    setCreateAppFormData: (state, action) => {
      state.createAppFormData = action.payload;
    },
    createApp: (state, action) => {
      state.isLoadingCreateAppForm = true;
      state.createAppError = null;
    },
    createAppSuccess: (state, action) => {
      state.isLoadingCreateAppForm = false;
      state.createAppError = null;
    },
    createAppFailure: (state, action) => {
      state.isLoadingCreateAppForm = false;
      state.createAppError = action.payload;
    },
    createAppCancelled: (state, action) => {
      state.isLoadingCreateAppForm = false;
      state.createAppError = null;
      console.log('createAppCancelled');
    },
    uploadApp: (state, action) => {
      state.isUploadingApp = true;
      state.uploadAppError = null;
      state.uploadedAppInfo = null;
    },
    uploadAppProgress: (state, action) => {
      state.uploadAppProgress = action.payload;
    },
    uploadAppSuccess: (state, action) => {
      state.uploadAppError = null;
      state.isUploadingApp = false;
      state.uploadedAppInfo = action.payload?.data;
    },
    uploadAppCancelled: (state, action) => {
      state.isUploadingApp = false;
      state.uploadAppError = null;
      state.uploadedAppInfo = null;
      state.uploadAppProgress = null;
      console.log('uploadAppCancelled');
    },
    uploadAppFailure: (state, action) => {
      state.isUploadingApp = false;
      state.uploadedAppInfo = null;
      state.uploadAppProgress = null;
      state.uploadAppError = action.payload;
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload,
      };
    },
    setToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
});

export const {
  toggleCreateAppFormOpen,
  toggleCreateAppFormMinimize,
  setCreateAppFormData,
  createApp,
  createAppSuccess,
  createAppFailure,
  createAppCancelled,
  uploadApp,
  uploadAppProgress,
  uploadAppSuccess,
  uploadAppCancelled,
  uploadAppFailure,
  setToast,
} = appsSlice.actions;

export default appsSlice.reducer;
