import { pushEvent } from '../../../../utilities/googleAnalytics';

type PageViewEventParams = {
  account: string;
  isTrader: boolean;
};

export const pushPageViewEvent = ({ account, isTrader }: PageViewEventParams) => {
  pushEvent(account || '', {
    event: 'title_change',
    eventValue: isTrader ? 'Settle Trader Position' : 'Settle LP Position',
  });
};

export const getAgent = (isTrader: boolean, isFT: boolean) => {
  return !isTrader ? 'Liquidity Provider' : isFT ? 'Fixed Trader' : 'Variable Trader';
};

export type SettleEventParams = {
  notional: number;
  margin: number;
  pool: string;
  isFT: boolean;
  account: string;
  isTrader: boolean;
};

export const pushSettleSubmittedEvent = ({
  notional,
  margin,
  pool,
  isFT,
  isTrader,
  account,
}: SettleEventParams) => {
  pushEvent(account, {
    event: 'tx_submitted',
    eventValue: {
      notional,
      margin,
      action: 'settle',
    },
    pool,
    agent: getAgent(isTrader, isFT),
  });
};

export const pushSettleSuccessEvent = ({
  notional,
  margin,
  pool,
  isFT,
  isTrader,
  account,
}: SettleEventParams) => {
  pushEvent(account, {
    event: 'successful_tx',
    eventValue: {
      notional,
      margin,
      action: 'settle',
    },
    pool,
    agent: getAgent(isTrader, isFT),
  });
};

type FailedSwapEventParams = SettleEventParams & {
  errorMessage: string;
};

export const pushSettleFailedEvent = ({
  notional,
  margin,
  pool,
  isFT,
  isTrader,
  account,
  errorMessage,
}: FailedSwapEventParams) => {
  pushEvent(account, {
    event: 'failed_tx',
    eventValue: {
      notional,
      margin,
      action: 'settle',
      failMessage: errorMessage,
    },
    pool,
    agent: getAgent(isTrader, isFT),
  });
};
