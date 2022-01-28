import SvgIcon from '@mui/material/SvgIcon';

import { InterfaceAlertInformationCircle, InterfaceAlertWarningCircle } from './icons';

export type Icons = 'warning-circle' | 'information-circle';

export const iconMap: Record<Icons, typeof SvgIcon> = {
  'information-circle': InterfaceAlertInformationCircle,
  'warning-circle': InterfaceAlertWarningCircle,
};
