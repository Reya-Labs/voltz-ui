import { useCallback, useEffect, useRef } from 'react';

const useDebounceFunc = (func: Function, duration: number = 300): () =>  void => {
  const timeoutRef = useRef<number>();

  const trigger = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(func, duration);
  }, [func, duration]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  return trigger;
};

export default useDebounceFunc;
