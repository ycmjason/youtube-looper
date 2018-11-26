export const throttle = (fn, wait) => {
  let lastCalledTime = 0;
  return (...args) => {
    if (Date.now() - lastCalledTime < wait) return;
    lastCalledTime = Date.now();
    console.log('called');
    fn(...args);
  };
};
