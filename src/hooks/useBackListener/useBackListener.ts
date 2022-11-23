import { useEffect } from 'react';

export const useBackListener = (callback: (event: Event) => void) => {
  useEffect(() => {
    window.addEventListener('popstate', callback, false);

    return () => {
      window.removeEventListener('popstate', callback);
    };
  }, [callback]);
};
