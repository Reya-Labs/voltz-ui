import { colors, SystemStyleObject, Theme } from '../../../../theme';

export const OPEN_CLASS = 'open';
export const ACTIVE_CLASS = 'active';

export const buttonSx: SystemStyleObject<Theme> = {
  fontSize: '16px',
  lineHeight: '16px',
  fontWeight: 400,
  fontFamily: 'DM Sans',
  letterSpacing: '0.02rem',
  color: colors.lavenderWeb,
  padding: (theme) => theme.spacing(2, 4),
  opacity: 0.7,
  textTransform: 'none',
  textDecoration: 'none',
  marginLeft: (theme) => theme.spacing(4),
  borderRadius: '8px',

  '&:hover': {
    background: '#352E56',
    opacity: 1,
  },

  [`&.${OPEN_CLASS}`]: {
    background: '#352E56',
    opacity: 1,
    borderRadius: '8px 8px 0px 0px',
  },

  [`&.${ACTIVE_CLASS}`]: {
    background: '#352E56',
    opacity: 1,
  },
};

export const subMenuButtonSx: SystemStyleObject<Theme> = {
  fontFamily: 'PixelOperatorMono',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '14px',
  letterSpacing: '0.02em',
  color: colors.lavenderWeb,
  textDecoration: 'none',
  background: '#251F3F',
  padding: (theme) => theme.spacing(2, 4),
  borderRadius: '8px',

  '&:hover': {
    textDecoration: 'none',
    borderRadius: '8px',
    borderBottomColor: 'transparent',
    background: '#0E0C16',
  },

  [`&.${ACTIVE_CLASS}`]: {
    background: '#0E0C16',
  },
};

export const buttonGroupSx: SystemStyleObject<Theme> = {
  '& .MuiButtonGroup-grouped:not(:last-of-type):hover': {
    borderBottomColor: 'transparent',
  },
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    textDecoration: 'none',
    borderRadius: '8px',
    borderBottomColor: 'transparent',
  },
  '& .MuiButtonGroup-grouped:not(:first-of-type)': {
    textDecoration: 'none',
    borderRadius: '8px',
    borderBottomColor: 'transparent',
  },
};

export const popoverOverrideSx: SystemStyleObject<Theme> = {
  '& .MuiPaper-root': {
    background: '#352E56',
    borderRadius: '0px 8px 8px 8px',
  },
  '& .MuiButtonGroup-root': {
    padding: (theme) => theme.spacing(4),
    rowGap: (theme) => theme.spacing(4),
    minWidth: '176px',
  },
};
