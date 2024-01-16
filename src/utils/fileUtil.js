export const getFileExtension = (fileName) => fileName?.split('.').pop();

export const getFileSizeMb = (size) => Math.round(size / (1024 * 10.24)) / 100;

export const getFileSizeKb = (size) => Math.round(size / 1024);

export const isValidFileUrl = (url) =>
  /^(ftp|http|https):\/\/[^ "]+$/.test(url);

/**
 * @param {*} file - file URL or Local File instance
 */
export const downloadFile = async (fileUrl, fileName, onError) => {
  try {
    let blob;
    if (!isValidFileUrl(fileUrl)) {
      throw new Error('Invalid file url');
    }
    // file is URL
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(response);
    }
    blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    // a.target='_blank';

    document.body.appendChild(a);
    a.click();
    // Remove the anchor from the document
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
    onError && onError(e);
  }
};
