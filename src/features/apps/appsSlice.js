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
  allApps: {
    list: [],
    pageNumber: 0,
    pageSize: 0,
    totalResults: 0,
    isLoading: false,
    error: null,
  },
  createAppForm: {
    formData: formDataInitialState,
    isOpen: false,
    isMinimize: false,
    isLoading: false,
    error: null,
  },
  uploadApp: {
    appInfo: null,
    isLoading: false,
    progress: null,
    error: null,
  },
  toastData: TOAST_INITIAL_DATA,
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    getApps: (state, action) => {
      state.allApps.isLoading = true;
    },
    getAppsSuccess: (state, action) => {
      state.allApps.isLoading = false;
      state.allApps.error = null;
    },
    getAppsFailure: (state, action) => {
      state.allApps.isLoading = false;
    },
    toggleCreateAppFormOpen: (state) => {
      state.createAppForm.isOpen = !state.createAppForm.isOpen;
      if (!state.createAppForm.isOpen) {
        // Form Closed
        state.createAppForm.isMinimize = false;
        state.createAppForm.formData = formDataInitialState;
      }
    },
    toggleCreateAppFormMinimize: (state) => {
      state.createAppForm.isMinimize = !state.createAppForm.isMinimize;
    },
    setCreateAppFormData: (state, action) => {
      state.createAppForm.formData = action.payload;
    },
    createApp: (state, action) => {
      state.createAppForm.isLoading = true;
      state.createAppForm.error = null;
    },
    createAppSuccess: (state, action) => {
      state.createAppForm.isLoading = false;
      state.createAppForm.error = null;
    },
    createAppFailure: (state, action) => {
      state.createAppForm.isLoading = false;
      state.createAppForm.error = action.payload;
    },
    createAppCancelled: (state, action) => {
      state.createAppForm.isLoading = false;
      state.createAppForm.error = null;
      console.log('createAppCancelled');
    },
    uploadApp: (state, action) => {
      state.uploadApp.isLoading = true;
      state.uploadApp.error = null;
      state.uploadApp.appInfo = null;
    },
    uploadAppProgress: (state, action) => {
      state.uploadApp.progress = action.payload;
    },
    uploadAppSuccess: (state, action) => {
      state.uploadApp.error = null;
      state.uploadApp.isLoading = false;
      state.uploadApp.appInfo = action.payload?.data;
    },
    uploadAppCancelled: (state, action) => {
      state.uploadApp = {
        appInfo: null,
        isLoading: false,
        progress: null,
        error: null,
      };
      console.log('uploadAppCancelled');
    },
    uploadAppFailure: (state, action) => {
      state.uploadApp = {
        appInfo: null,
        isLoading: false,
        progress: null,
        error: action.payload,
      };
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
