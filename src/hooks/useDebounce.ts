import { useState, useEffect, useRef } from 'react';

const useDebounce = <T>(value: T, duration: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setDebouncedValue(value), duration);

    return () => window.clearTimeout(timeoutRef.current);
  }, [value, timeoutRef]);

  return debouncedValue;
};

export default useDebounce;
