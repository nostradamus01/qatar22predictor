const developmentMode = false;

const createUrl = (url) => {
    return (!developmentMode ? '/.netlify/functions/api' : '') + url;
}