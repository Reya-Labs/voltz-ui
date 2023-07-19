import { pushEvent } from '../../../../../../utilities/googleAnalytics';

type PageViewEventParams = {
  account: string;
};
export const pushPageViewEvent = ({ account }: PageViewEventParams) => {
  pushEvent(account || '', {
    event: 'title_change',
    eventValue: 'LP Rollover Position',
  });
};

export type RolloverEventParams = {
  notional: number;
  margin: number;
  pool: string;
  account: string;
};

export const pushRolloverSubmittedEvent = ({
  notional,
  margin,
  pool,
  account,
}: RolloverEventParams) => {
  pushEvent(account, {
    event: 'tx_submitted',
    eventValue: {
      notional,
      margin,
      action: 'rollover',
    },
    pool,
    agent: 'Liquidity Provider',
  });
};

export const pushRolloverSuccessEvent = ({
  notional,
  margin,
  pool,
  account,
}: RolloverEventParams) => {
  pushEvent(account, {
    event: 'successful_tx',
    eventValue: {
      notional,
      margin,
      action: 'rollover',
    },
    pool,
    agent: 'Liquidity Provider',
  });
};

type FailedRolloverEventParams = RolloverEventParams & {
  errorMessage: string;
};
export const pushRolloverFailedEvent = ({
  notional,
  margin,
  pool,
  account,
  errorMessage,
}: FailedRolloverEventParams) => {
  pushEvent(account, {
    event: 'failed_tx',
    eventValue: {
      notional,
      margin,
      action: 'rollover',
      failMessage: errorMessage,
    },
    pool,
    agent: 'Liquidity Provider',
  });
};

type EstimatedLeverageChangeEventParams = {
  leverage: number;
  pool: string;
  account: string;
  changeType: 'button' | 'input';
};
export const pushLeverageChangeEvent = ({
  account,
  leverage,
  pool,
  changeType,
}: EstimatedLeverageChangeEventParams) => {
  pushEvent(account ?? '', {
    event: changeType === 'input' ? 'leverage_change_input' : 'leverage_change_button',
    eventValue: leverage,
    pool,
    agent: 'Liquidity Provider',
  });
};
