import { createSlice } from '@reduxjs/toolkit';
import { TOAST_INITIAL_DATA, TOAST_TYPE } from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  toastData: TOAST_INITIAL_DATA,
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
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload,
      };
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
      state.toastData = {
        type: TOAST_TYPE.ERROR,
        message: action.payload,
      };
    },
    signOut: (state) => {
      state.isAuthenticated = false;
    },
    setToast: (state, action) => {
      state.toastData = action.payload;
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
  setToast,
} = authSlice.actions;

export default authSlice.reducer;
