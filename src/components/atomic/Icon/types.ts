import SvgIcon from '@mui/material/SvgIcon';

import {
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  Metamask,
} from './icons';

export type Icons = 'ethereum' | 'warning-circle' | 'information-circle' | 'metamask';

export const iconMap: Record<Icons, typeof SvgIcon> = {
  ethereum: Ethereum as typeof SvgIcon,
  'information-circle': InterfaceAlertInformationCircle as typeof SvgIcon,
  'warning-circle': InterfaceAlertWarningCircle as typeof SvgIcon,
  metamask: Metamask as typeof SvgIcon,
};
