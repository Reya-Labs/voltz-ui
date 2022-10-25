import { colors, SystemStyleObject, Theme } from '@theme';

export const activeButtonStyle: SystemStyleObject<Theme> = {
    flex: 1,
    color: colors.lavenderWeb.base,
    border: `1px solid ${colors.lavenderWeb.darken025}`,
    backgroundColor: '#43405B',
};
export const buttonStyle: SystemStyleObject<Theme> = {
    flex: 1,
    backgroundColor: '#2D2B3D',
    color: colors.lavenderWeb.base,
};