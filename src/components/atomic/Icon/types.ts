import { ElementType } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Burn,
  Ethereum,
  InterfaceAlertInformationCircle,
  InterfaceAlertWarningCircle,
  Liquidation,
  MarginUpdate,
  Metamask,
  Mint,
  Settle,
  Swap,
  Voltz,
} from './icons';

export type Icons =
  | 'arrow-left'
  | 'arrow-right'
  | 'ethereum'
  | 'warning-circle'
  | 'information-circle'
  | 'metamask'
  | 'voltz'
  | 'tx-burn'
  | 'tx-liquidation'
  | 'tx-margin-update'
  | 'tx-mint'
  | 'tx-settle'
  | 'tx-swap';

export const iconMap: Record<Icons, ElementType> = {
  'arrow-left': ArrowLeft as ElementType,
  'arrow-right': ArrowRight as ElementType,
  ethereum: Ethereum as ElementType,
  'information-circle': InterfaceAlertInformationCircle as ElementType,
  'warning-circle': InterfaceAlertWarningCircle as ElementType,
  metamask: Metamask as ElementType,
  voltz: Voltz as ElementType,
  'tx-burn': Burn as ElementType,
  'tx-liquidation': Liquidation as ElementType,
  'tx-margin-update': MarginUpdate as ElementType,
  'tx-mint': Mint as ElementType,
  'tx-settle': Settle as ElementType,
  'tx-swap': Swap as ElementType,
};
