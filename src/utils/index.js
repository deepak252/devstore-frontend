export const debounceHandler = () => {
  let timeoutId;
  return function (func, delay = 500) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
};

export const generateOptions = (options) =>
  options?.map((opt) => ({
    label: opt,
    value: opt,
  }));
