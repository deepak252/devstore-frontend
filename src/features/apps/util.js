import { REGEX } from '../../constants';
import { isEmptyString } from '../../utils/validator';

export const appFormValidator = {
  name: (val) => {
    if (isEmptyString(val)) {
      return "App name can't be empty";
    }
  },
  sourceCode: (val) => {
    if (isEmptyString(val)) {
      return;
    }
    if (!REGEX.URL.test(val)) {
      return 'Invalid source code URL';
    }
  },
  attachmentPackage: (val) => {
    if (!val) {
      return 'Application package file is required';
    }
  },
  attachmentIcon: (val) => {
    if (!val) {
      return 'App icon is required';
    }
  },
  attachmentImages: (val) => {
    if (!val || !val.length) {
      return 'Upload at least one image';
    }
  },
};
