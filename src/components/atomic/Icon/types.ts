import { ElementType } from 'react';

import {
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  Metamask,
  Voltz,
} from './icons';

export type Icons = 'ethereum' | 'warning-circle' | 'information-circle' | 'metamask' | 'voltz';

export const iconMap: Record<Icons, ElementType<any>> = {
  ethereum: Ethereum,
  'information-circle': InterfaceAlertInformationCircle,
  'warning-circle': InterfaceAlertWarningCircle,
  metamask: Metamask,
  voltz: Voltz,
};
