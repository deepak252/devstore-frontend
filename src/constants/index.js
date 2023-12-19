export const REGEX = Object.freeze({
  EMAIL: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  URL: /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?(\?[\w%.-]+=[\w%.-]+(&[\w%.-]+=[\w%.-]+)*)?$/,
  MILITARY_TIME: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
});

export const LOCALSTORAGE = Object.freeze({
  AUTH_TOKEN: 'authToken',
  USER: 'user',
});

export const TOAST_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error'
});

export const TOAST_INITIAL_DATA = {
  type: null,
  message: null
}