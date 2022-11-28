const developmentMode = true;

const createUrl = (url) => {
    return (!developmentMode ? '/.netlify/functions/api' : '') + url;
}