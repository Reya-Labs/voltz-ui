import { colors, SystemStyleObject, Theme } from '@theme';
import { keyframes } from '@mui/system';

const shake = keyframes`
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%, 40%, 60%, 80% {
    transform: translate3d(1px, 0, 0);
  }
`;

export const iconSx: SystemStyleObject<Theme> = {
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  transition: 'filter 150ms ease-in',
  '&:hover': {
    filter: `drop-shadow(0px 4px 20px ${colors.wildStrawberry.base}) drop-shadow(0px 0px 40px ${colors.wildStrawberry.base})`,
  },
  '&:hover > path': {
    fill: colors.lavenderWeb.base,
  },
  '& > path': {
    fill: colors.lavenderWeb.darken010,
  },
};

export const buttonSx: SystemStyleObject<Theme> = {
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
