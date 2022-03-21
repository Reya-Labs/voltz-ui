import { useState, useEffect, useRef } from 'react';

const useDebounce = <T>(value: T, duration: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setDebouncedValue(value), duration);

    return () => clearTimeout(timeoutRef.current);
  }, [value, timeoutRef]);

  return debouncedValue;
};

export default useDebounce;
