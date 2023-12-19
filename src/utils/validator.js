import { REGEX } from '../constants';

export const isEmptyString = (val) => {
  return !val?.trim()?.length;
};

export const validatePhone = (val) => {
  if (isEmptyString(val)) {
    return 'Phone number is required';
  }
  if (!REGEX.PHONE.test(val)) {
    return 'Invalid phone number';
  }
};

export const validateUsername = (val) => {
  if (isEmptyString(val)) {
    return 'Enter username';
  }
  if (val.length < 3) {
    return 'Username must contain at least 3 characters';
  }
  if (val.length > 20) {
    return 'Username should not contain more than 20 characters';
  }
  if (!REGEX.ALPHANUMERIC.test(val)) {
    return 'Username should contain only letters and numbers';
  }
};

export const validateEmail = (val) => {
  if (isEmptyString(val)) {
    return 'Enter email';
  }
  if (!REGEX.EMAIL.test(val)) {
    return 'Invalid email ID';
  }
};

export const validatePasswordSignIn = (val) => {
  if (isEmptyString(val)) {
    return 'Enter password';
  }
};

export const validatePasswordSignUp = (val) => {
  if (isEmptyString(val)) {
    return 'Enter password';
  }
  if (val.trim().length < 6) {
    return 'Password must contains at least 6 characters';
  }
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword !== password) {
    return 'Password not match';
  }
};
