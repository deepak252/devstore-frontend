export const REGEX = Object.freeze({
  EMAIL: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  URL: /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?(\?[\w%.-]+=[\w%.-]+(&[\w%.-]+=[\w%.-]+)*)?$/,
  MILITARY_TIME: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  ALPHANUMERIC: /^[A-Za-z0-9]*$/,
});

export const LOCALSTORAGE = Object.freeze({
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  METADATA: 'metadata',
});

export const ATTACHMENT_TYPE = Object.freeze({
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document',
});

export const TOAST_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
});

export const TOAST_INITIAL_DATA = {
  type: null,
  message: null,
};

export const FILE_EXTENSIONS = Object.freeze({
  IMAGE: ['.jpg', '.jpeg', '.png'],
  VIDEO: ['.mp4', '.avi', '.mkv', '.webm', '.3gp'],
});


export const PLATFORM = Object.freeze({
  All: 'all',
  Android: 'android',
  iOS: 'ios',
});

