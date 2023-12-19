import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
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
  },
});

export const { getUser, getUserSuccess, getUserFailure, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
