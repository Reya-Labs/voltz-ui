import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export const useInitializeGoogleTagManager = () => {
  useEffect(() => {
    if (process.env.REACT_APP_GTM_CODE) {
      TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_CODE });
    }
  }, []);
};
