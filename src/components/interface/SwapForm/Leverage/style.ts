import { colors, SystemStyleObject, Theme } from '../../../../theme';

export const activeButtonStyle: SystemStyleObject<Theme> = {
  flex: 1,
  color: colors.lavenderWeb,
  border: `1px solid ${colors.lavenderWeb4}`,
  backgroundColor: colors.liberty2,
};
export const buttonStyle: SystemStyleObject<Theme> = {
  flex: 1,
  backgroundColor: colors.liberty4,
  color: colors.lavenderWeb,
};

export const leverageBoxStyle: SystemStyleObject<Theme> = {
  flexGrow: '1',
  marginLeft: (theme) => theme.spacing(8),
  marginTop: (theme) => theme.spacing(5.5),
  display: 'flex',
  alignItems: 'center',
  columnGap: (theme) => theme.spacing(2),
  width: '232px',
};
