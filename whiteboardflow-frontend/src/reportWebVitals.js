/**
 * Reports web vital metrics to an analytics endpoint or logs them.
 * This function loads web vital metrics such as CLS, FID, FCP, LCP, and TTFB 
 * and calls the provided callback with the results.
 *
 * @param {Function} onPerfEntry - Callback function that receives web vitals metrics.
 * It is only called if `onPerfEntry` is a function.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
