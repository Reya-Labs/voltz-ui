import { ElementType } from 'react';

import {
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  Metamask,
  Voltz,
} from './icons';

export type Icons = 'ethereum' | 'warning-circle' | 'information-circle' | 'metamask' | 'voltz';

export const iconMap: Record<Icons, ElementType> = {
  ethereum: Ethereum as ElementType,
  'information-circle': InterfaceAlertInformationCircle as ElementType,
  'warning-circle': InterfaceAlertWarningCircle as ElementType,
  metamask: Metamask as ElementType,
  voltz: Voltz as ElementType,
};
