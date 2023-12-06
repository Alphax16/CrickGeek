const getFileExtension = (filename) => {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex === -1 ? null : filename.slice(dotIndex + 1);
};
  
const getFileExtensionFromUrl = (url) => {
    const match = url.match(/\.(.+)$/);
    return match ? match[1] : null;
};

export { getFileExtension, getFileExtensionFromUrl };
