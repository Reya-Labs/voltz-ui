import { colors, SystemStyleObject, Theme } from '@theme';
import { keyframes } from '@mui/system';

const glow = keyframes`
  10%, 30%, 50%, 70%, 90% {
    filter: drop-shadow(0px 4px 20px ${colors.orangeYellow.base}) drop-shadow(0px 0px 40px ${colors.orangeYellow.base});
  }
  
  20%, 40%, 60%, 80% {
    filter: drop-shadow(0px 4px 10px ${colors.orangeYellow.base}) drop-shadow(0px 0px 15px ${colors.orangeYellow.base});
  }
`;

const shake = keyframes`
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(1px, 0, 0);
  }
`;

export const iconSx: SystemStyleObject<Theme> = {
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  filter: (theme) =>
    `drop-shadow(0px 4px 20px ${theme.palette.error.base}) drop-shadow(0px 0px 40px ${theme.palette.error.base})`,
  '&:hover': {
    animation: `${glow} 2000ms infinite ease`,
  },
  '&:hover > g': {
    animation: `${shake} 100ms infinite ease`,
    fill: `${colors.orangeYellow.base}`,
  },
};

export const buttonSx: SystemStyleObject<Theme> = {
  // color: 'secondary.light',
  fontSize: '16px',
  lineHeight: '14px',
  fontWeight: 400,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'secondary.darken020',
  padding: (theme) => theme.spacing(2),
  marginLeft: (theme) => theme.spacing(2),

  '&:hover': {
    textDecoration: 'none',
    backgroundColor: 'transparent',
    color: 'secondary.light',
    textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)',
  },

  '&:active': {
    textDecoration: 'none',
    backgroundColor: 'transparent',
    color: 'secondary.light',
    textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)',
  },

  '&.open': {
    textDecoration: 'none',
    backgroundColor: 'transparent',
    color: 'secondary.light',
    textShadow: '0px 0px 11px rgba(229, 225, 249, 0.7)',
  },
};

export const subMenuButtonSx: SystemStyleObject<Theme> = {
  ...buttonSx,
  marginTop: (theme) => `${theme.spacing(2)} !important`,
  marginLeft: 0,
  textAlign: 'left',
  justifyContent: 'flex-start',
};

export const buttonGroupSx: SystemStyleObject<Theme> = {
  '& .MuiButtonGroup-grouped:not(:last-of-type):hover': {
    borderBottomColor: 'transparent',
  },
};

export const popoverOverrideSx: SystemStyleObject<Theme> = {
  '& .MuiPaper-root': {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    background: 'none',
    backdropFilter: 'blur(8px)',
    borderRadius: '4px',
    border: '1px solid rgba(15,12,29,.24)',
  },
};
