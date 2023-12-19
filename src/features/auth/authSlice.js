import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    signInFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isLoading = false;
    },
    signUp: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    signUpFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.isLoading = false;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
