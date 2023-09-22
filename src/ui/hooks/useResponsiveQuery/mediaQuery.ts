const size = {
  mobileDevice: '390px',
  tabletDevice: '834px',
  smallDesktopDevice: '1440px',
  largeDesktopDevice: '1920px',
};

export const mediaQuery = {
  mobileDevice: `(min-width: ${size.mobileDevice})`,
  tabletDevice: `(min-width: ${size.tabletDevice})`,
  smallDesktopDevice: `(min-width: ${size.smallDesktopDevice})`,
  largeDesktopDevice: `(min-width: ${size.largeDesktopDevice})`,
};
