import { ElementType } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  Metamask,
  Voltz,
} from './icons';

export type Icons =
  | 'arrow-left'
  | 'arrow-right'
  | 'ethereum'
  | 'warning-circle'
  | 'information-circle'
  | 'metamask'
  | 'voltz';

export const iconMap: Record<Icons, ElementType> = {
  'arrow-left': ArrowLeft as ElementType,
  'arrow-right': ArrowRight as ElementType,
  ethereum: Ethereum as ElementType,
  'information-circle': InterfaceAlertInformationCircle as ElementType,
  'warning-circle': InterfaceAlertWarningCircle as ElementType,
  metamask: Metamask as ElementType,
  voltz: Voltz as ElementType,
};
