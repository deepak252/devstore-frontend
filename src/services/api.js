import axios from 'axios';
import { clearCache, getAuthToken } from '../app/cache';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const setupInterceptor = (navigate) => {
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        clearCache();
        navigate('/auth');
      }
      return Promise.reject(error);
    }
  );
};
const getQueryString = (obj) => {
  let queryString =
    obj &&
    Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
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
  { queryParams, data, headers = {} } = {}
) => {
  const queryString = getQueryString(queryParams);
  const authToken = getAuthToken();
  return api
    .post(endpoint + queryString, data, {
      headers: {
        Authorization: authToken,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};
