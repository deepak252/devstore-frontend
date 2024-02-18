import axios from 'axios';
import { clearUserCache, getAuthToken } from '../app/cache';
import { signOut } from '../features/auth/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

export const setupInterceptor = (navigate, dispatch) => {
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error.config.url);
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        clearUserCache();
        dispatch && dispatch(signOut());
        navigate && navigate('/auth');
      }
      return Promise.reject(error);
    }
  );
};
const getQueryString = (obj) => {
  let queryString =
    obj &&
    Object.entries(obj)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  queryString = queryString && `?${queryString}`;
  return queryString ?? '';
};
export const getRequest = async (
  endpoint = '',
  { queryParams, headers = {} } = {}
) => {
  const queryString = getQueryString(queryParams);
  const authToken = getAuthToken();
  return api
    .get(endpoint + queryString, {
      headers: {
        Authorization: authToken,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

export const postRequest = async (
  endpoint = '',
  {
    queryParams,
    data,
    headers = {},
    onUploadProgress,
    onDownloadProgress,
    ...args
  } = {}
) => {
  const queryString = getQueryString(queryParams);
  const authToken = getAuthToken();
  return api
    .post(endpoint + queryString, data, {
      headers: {
        Authorization: authToken,
        ...headers,
      },
      onUploadProgress,
      onDownloadProgress,
      ...args,
    })
    .then((response) => response)
    .catch((error) => error.response);
};
