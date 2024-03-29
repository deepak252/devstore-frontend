import { createSlice } from '@reduxjs/toolkit';
import { PLATFORM, TOAST_INITIAL_DATA, TOAST_TYPE } from '../../constants';

const formDataInitialState = {
  name: '',
  description: '',
  categories: [],
  sourceCode: '',
  isSourceCodePublic: true,
  isPrivate: false,
  platform: PLATFORM.Android,
  attachmentApp: null, // File Instance
  attachmentIcon: null,
  attachmentImages: [],
  attachmentVideo: null,
  attachmentGraphic: null,
};

const initialState = {
  appData: {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalResults: 0,
    isLoading: false,
    error: null,
  },
  search: {
    query: '',
  },
  filter: {
    platform: PLATFORM.All, // all, android, ios
    categories: [],
  },
  appDetails: {
    data: null,
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
  banner: {
    list: [],
    isLoading: false,
    error: null,
  },
  toastData: TOAST_INITIAL_DATA,
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    getApps: (state, action) => {
      if (action.payload?.searchQuery) {
        // clear prev items on search
        state.appData.items = [];
      }
      if (!state.appData?.items?.length || action.payload?.enableLoading) {
        state.appData.isLoading = true;
      }
    },
    getAppsSuccess: (state, action) => {
      state.appData.isLoading = false;
      state.appData.error = null;
      state.appData.items = action.payload?.data?.apps;
    },
    getAppsFailure: (state, action) => {
      state.appData.isLoading = false;
      state.appData.error = action.payload;
    },
    getAppDetails: (state, action) => {
      state.appDetails = {
        isLoading: true,
        error: null,
        data: null,
      };
    },
    getAppDetailsSuccess: (state, action) => {
      state.appDetails.isLoading = false;
      state.appDetails.error = null;
      state.appDetails.data = action.payload?.data;
    },
    getAppDetailsFailure: (state, action) => {
      state.appDetails.isLoading = false;
      state.appDetails.error = action.payload;
    },
    toggleCreateAppFormOpen: (state) => {
      state.createAppForm.isOpen = !state.createAppForm?.isOpen;
      if (!state.createAppForm.isOpen) {
        // Form Closed
        state.createAppForm.isMinimize = false;
        state.createAppForm.formData = formDataInitialState;
      }
    },
    toggleCreateAppFormMinimize: (state) => {
      state.createAppForm.isMinimize = !state.createAppForm?.isMinimize;
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
    getAppsBanner: (state, action) => {
      state.banner.isLoading = true;
    },
    getAppsBannerSuccess: (state, action) => {
      state.banner.isLoading = false;
      state.banner.error = null;
      state.banner.list = action.payload?.data;
    },
    getAppsBannerFailure: (state, action) => {
      state.banner.isLoading = false;
      state.banner.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
});

export const {
  getApps,
  getAppsSuccess,
  getAppsFailure,
  getAppDetails,
  getAppDetailsSuccess,
  getAppDetailsFailure,
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
  getAppsBanner,
  getAppsBannerSuccess,
  getAppsBannerFailure,
  setFilter,
  setToast,
} = appsSlice.actions;

export default appsSlice.reducer;
