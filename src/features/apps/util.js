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
  attachmentApp: (val) => {
    if (!val) {
      return 'Application file is required';
    }
  },
};
