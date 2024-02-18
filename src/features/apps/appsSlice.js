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
  attachmentPackage: null, // File Instance
  attachmentIcon: null,
  attachmentImages: [],
  attachmentVideo: null,
  attachmentGraphic: null,
};

const initialState = {
  appData: {
    items: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
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
  appPackage: {
    info: null,
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
      state.appData.items = action.payload?.data?.projects;
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
      state.createAppForm = {
        isLoading: false,
        error: null,
        formData: formDataInitialState,
        isOpen: false,
        isMinimize: false,
      }
      state.toastData = {
        type: TOAST_TYPE.SUCCESS,
        message: "App added successfully!",
      };
    },
    createAppFailure: (state, action) => {
      state.createAppForm.isLoading = false;
      state.createAppForm.error = action.payload;
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload ||  "Something went wrong",
      };
    },
    createAppCancelled: (state, action) => {
      state.createAppForm.isLoading = false;
      state.createAppForm.error = null;
      console.log('createAppCancelled');
    },
    uploadAppPackage: (state, action) => {
      state.appPackage.isLoading = true;
      state.appPackage.error = null;
      state.appPackage.info = null;
    },
    uploadAppPackageProgress: (state, action) => {
      state.appPackage.progress = action.payload;
    },
    uploadAppPackageSuccess: (state, action) => {
      state.appPackage.error = null;
      state.appPackage.isLoading = false;
      state.appPackage.info = action.payload?.data;
    },
    uploadAppPackageCancelled: (state, action) => {
      state.appPackage = {
        info: null,
        isLoading: false,
        progress: null,
        error: null,
      };
      console.log('uploadAppCancelled');
    },
    uploadAppPackageFailure: (state, action) => {
      state.appPackage = {
        info: null,
        isLoading: false,
        progress: null,
        error: action.payload,
      };
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload || "Something went wrong",
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
  uploadAppPackage,
  uploadAppPackageProgress,
  uploadAppPackageSuccess,
  uploadAppPackageCancelled,
  uploadAppPackageFailure,
  getAppsBanner,
  getAppsBannerSuccess,
  getAppsBannerFailure,
  setFilter,
  setToast,
} = appsSlice.actions;

export default appsSlice.reducer;
