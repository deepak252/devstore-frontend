import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state) => {
      state.user=null;
      state.isLoading = true;
    },
    getProfileSuccess: (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload?.data;
    },
    getProfileFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getProfile,
  getProfileSuccess,
  getProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;
