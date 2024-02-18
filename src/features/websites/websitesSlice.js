import { createSlice } from '@reduxjs/toolkit';
import { TOAST_INITIAL_DATA, TOAST_TYPE } from '../../constants';

const formDataInitialState = {
  name: '',
  description: '',
  categories: [],
  sourceCode: '',
  isSourceCodePublic: true,
  isPrivate: false,
  attachmentIcon: null,
  attachmentImages: [],
  attachmentVideo: null,
  attachmentGraphic: null,
};

const initialState = {
  websiteData: {
    items: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  filter: {
    categories: [],
  },
  websiteDetails: {
    data: null,
    isLoading: false,
    error: null,
  },
  createWebsiteForm: {
    formData: formDataInitialState,
    isOpen: false,
    isMinimize: false,
    isLoading: false,
    error: null,
  },
  banner: {
    list: [],
    isLoading: false,
    error: null,
  },
  toastData: TOAST_INITIAL_DATA,
};

const websitesSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    getWebsites: (state, action) => {
      if (action.payload?.searchQuery) {
        // clear prev items on search
        state.websiteData.items = [];
      }
      if (!state.websiteData?.items?.length || action.payload?.enableLoading) {
        state.websiteData.isLoading = true;
      }
    },
    getWebsitesSuccess: (state, action) => {
      state.websiteData.isLoading = false;
      state.websiteData.error = null;
      state.websiteData.items = action.payload?.data?.projects;
    },
    getWebsitesFailure: (state, action) => {
      state.websiteData.isLoading = false;
      state.websiteData.error = action.payload;
    },
    getWebsiteDetails: (state, action) => {
      state.websiteDetails = {
        isLoading: true,
        error: null,
        data: null,
      };
    },
    getWebsiteDetailsSuccess: (state, action) => {
      state.websiteDetails.isLoading = false;
      state.websiteDetails.error = null;
      state.websiteDetails.data = action.payload?.data;
    },
    getWebsiteDetailsFailure: (state, action) => {
      state.websiteDetails.isLoading = false;
      state.websiteDetails.error = action.payload;
    },
    toggleCreateWebsiteFormOpen: (state) => {
      state.createWebsiteForm.isOpen = !state.createWebsiteForm?.isOpen;
      if (!state.createWebsiteForm.isOpen) {
        // Form Closed
        state.createWebsiteForm.isMinimize = false;
        state.createWebsiteForm.formData = formDataInitialState;
      }
    },
    toggleCreateWebsiteFormMinimize: (state) => {
      state.createWebsiteForm.isMinimize = !state.createWebsiteForm?.isMinimize;
    },
    setCreateWebsiteFormData: (state, action) => {
      state.createWebsiteForm.formData = action.payload;
    },
    createWebsite: (state, action) => {
      state.createWebsiteForm.isLoading = true;
      state.createWebsiteForm.error = null;
    },
    createWebsiteSuccess: (state, action) => {
      state.createWebsiteForm = {
        isLoading: false,
        error: null,
        formData: formDataInitialState,
        isOpen: false,
        isMinimize: false,
      }
      state.toastData = {
        type: TOAST_TYPE.SUCCESS,
        message: "Website added successfully!",
      };
    },
    createWebsiteFailure: (state, action) => {
      state.createWebsiteForm.isLoading = false;
      state.createWebsiteForm.error = action.payload;
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload ||  "Something went wrong",
      };
    },
    createWebsiteCancelled: (state, action) => {
      state.createWebsiteForm.isLoading = false;
      state.createWebsiteForm.error = null;
      console.log('createWebsiteCancelled');
    },
    getWebsitesBanner: (state, action) => {
      state.banner.isLoading = true;
    },
    getWebsitesBannerSuccess: (state, action) => {
      state.banner.isLoading = false;
      state.banner.error = null;
      state.banner.list = action.payload?.data;
    },
    getWebsitesBannerFailure: (state, action) => {
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
  getWebsites,
  getWebsitesSuccess,
  getWebsitesFailure,
  getWebsiteDetails,
  getWebsiteDetailsSuccess,
  getWebsiteDetailsFailure,
  toggleCreateWebsiteFormOpen,
  toggleCreateWebsiteFormMinimize,
  setCreateWebsiteFormData,
  createWebsite,
  createWebsiteSuccess,
  createWebsiteFailure,
  createWebsiteCancelled,
  getWebsitesBanner,
  getWebsitesBannerSuccess,
  getWebsitesBannerFailure,
  setFilter,
  setToast,
} = websitesSlice.actions;

export default websitesSlice.reducer;
