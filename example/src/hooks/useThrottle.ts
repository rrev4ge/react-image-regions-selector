import { useCallback, useRef } from 'react';

const useThrottle = (callback: any, delay: any) => {
  const isThrottled = useRef<any>(null);

  const throttledCallback = useCallback(
    (...args: any) => {
      if (isThrottled.current) {
        return;
      }
      callback(args);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay],
  );

  return throttledCallback;
};

export default useThrottle;
