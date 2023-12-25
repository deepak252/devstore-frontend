export const getFileExtension = (fileName) => fileName?.split('.').pop();

export const getFileSizeMb = (size) => Math.round(size / (1024 * 10.24)) / 100;

export const getFileSizeKb = (size) => Math.round(size / 1024);
