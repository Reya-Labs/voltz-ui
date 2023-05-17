import { pushEvent } from '../../../../../../utilities/googleAnalytics';

type PageViewEventParams = {
  account: string;
};
export const pushPageViewEvent = ({ account }: PageViewEventParams) => {
  pushEvent(account || '', {
    event: 'title_change',
    eventValue: 'Trader Rollover Position',
  });
};

export type RolloverEventParams = {
  notional: number;
  margin: number;
  pool: string;
  isFT: boolean;
  account: string;
};

export const pushRolloverSubmittedEvent = ({
  notional,
  margin,
  pool,
  isFT,
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
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

export const pushRolloverSuccessEvent = ({
  notional,
  margin,
  pool,
  isFT,
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
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

type FailedRolloverEventParams = RolloverEventParams & {
  errorMessage: string;
};
export const pushRolloverFailedEvent = ({
  notional,
  margin,
  pool,
  isFT,
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
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

type EstimatedLeverageChangeEventParams = {
  leverage: number;
  pool: string;
  isFT: boolean;
  account: string;
  changeType: 'button' | 'input';
};
export const pushLeverageChangeEvent = ({
  account,
  leverage,
  isFT,
  pool,
  changeType,
}: EstimatedLeverageChangeEventParams) => {
  pushEvent(account ?? '', {
    event: changeType === 'input' ? 'leverage_change_input' : 'leverage_change_button',
    eventValue: leverage,
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};
