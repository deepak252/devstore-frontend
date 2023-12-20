import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  userProfile: null,
  isLoadingUserProfile: false,
  userProfileError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload?.data;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    getUserProfile: (state) => {
      state.isLoadingUserProfile = true;
    },
    getUserProfileSuccess: (state, action) => {
      state.userProfileError = null;
      state.isLoadingUserProfile = false;
      state.userProfile = action.payload?.data;
    },
    getUserProfileFailure: (state, action) => {
      state.userProfileError = action.payload;
      state.isLoadingUserProfile = false;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserFailure,
  deleteUser,
  getUserProfile,
  getUserProfileSuccess,
  getUserProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;
