import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  featured: {
    apps: [],
    websites: [],
    games: [],
    isLoading: false,
    error: null,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getFeatured: (state) => {
      state.featured.isLoading = true;
    },
    getFeaturedSuccess: (state, action) => {
      state.featured.error = null;
      state.featured.isLoading = false;
      state.featured.apps = action.payload?.data?.apps??[];
      state.featured.websites = action.payload?.data?.websites??[];
      state.featured.games = action.payload?.data?.games??[];
    },
    getFeaturedFailure: (state, action) => {
      state.featured.error = action.payload;
      state.featured.isLoading = false;
    },
  },
});

export const { getFeatured, getFeaturedSuccess, getFeaturedFailure } =
  homeSlice.actions;

export default homeSlice.reducer;
