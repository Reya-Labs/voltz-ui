import { PositionSortId, PositionSorting } from './types';

export const resetSortingDirection: PositionSorting = {
  maturity: 'noSort',
  realizedPNL: 'noSort',
  status: 'noSort',
  unrealizedPNL: 'noSort',
  margin: 'noSort',
  notional: 'noSort',
  name: 'noSort',
};

export const initialSortingDirection: PositionSorting = {
  ...resetSortingDirection,
};

export const SORT_CONFIG: Record<
  PositionSortId,
  {
    text: string;
    subtext?: string;
    disabled: boolean;
  }
> = {
  realizedPNL: {
    text: 'Realized PnL',
    disabled: true,
  },
  status: {
    text: 'Status',
    disabled: true,
  },
  unrealizedPNL: {
    text: 'Unrealized PNL',
    disabled: true,
  },
  name: {
    text: 'Side - Pool',
    disabled: true,
  },
  margin: {
    text: 'Margin',
    disabled: false,
  },
  notional: {
    text: 'Notional',
    disabled: false,
  },
  maturity: {
    text: 'Maturity',
    disabled: true,
  },
};
