import { useMediaQuery } from 'react-responsive';

import { mediaQuery } from './mediaQuery';

type UseResponsiveQueryReturn = {
  isSmallDesktopDevice: boolean;
  isLargeDesktopDevice: boolean;
  isTabletDevice: boolean;
  isMobileDevice: boolean;
};

export const useResponsiveQuery = (): UseResponsiveQueryReturn => {
  const isMobileDevice = useMediaQuery({
    query: mediaQuery.mobileDevice,
  });

  const isTabletDevice = useMediaQuery({
    query: mediaQuery.tabletDevice,
  });

  const isSmallDesktopDevice = useMediaQuery({
    query: mediaQuery.smallDesktopDevice,
  });

  const isLargeDesktopDevice = useMediaQuery({
    query: mediaQuery.largeDesktopDevice,
  });

  return {
    isLargeDesktopDevice,
    isSmallDesktopDevice,
    isMobileDevice,
    isTabletDevice,
  };
};
