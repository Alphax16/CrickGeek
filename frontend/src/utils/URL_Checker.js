const isURL = (str) => {
    const urlPattern = /^(http|https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(str);
};

export { isURL };
