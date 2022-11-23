import { SystemStyleObject, Theme } from '@theme';

export const commonOverrides: SystemStyleObject<Theme> = {
  '& .MuiTableCell-root': {
    borderColor: 'transparent',
    paddingRight: (theme) => theme.spacing(4),
    paddingLeft: (theme) => theme.spacing(4),
    paddingTop: (theme) => theme.spacing(3),
    paddingBottom: (theme) => theme.spacing(4),
    '&:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
  '.MuiInputLabel-root': {
    marginBottom: (theme) => theme.spacing(1),
  },
};
