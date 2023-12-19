import { LOCALSTORAGE } from '../constants';

export const cacheAuthToken = (token) => {
  localStorage.setItem(LOCALSTORAGE.AUTH_TOKEN, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(LOCALSTORAGE.AUTH_TOKEN)?.trim();
};
export const isSignedIn = () => {
  const token = getAuthToken();
  return token && token.length !== 0;
};

export const cacheUser = (user) => {
  if (!user) return;
  localStorage.setItem(LOCALSTORAGE.USER, JSON.stringify(user));
};

export const getCachedUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE.USER));
  } catch (e) {
    return null;
  }
};

export const clearCache = () => localStorage.clear();
