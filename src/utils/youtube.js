export const parseIdFromUrl = (url) => {
  const reg = /v=([^&]+)/;
  if (!reg.test(url)) return '';
  return url.match(reg)[1];
};

