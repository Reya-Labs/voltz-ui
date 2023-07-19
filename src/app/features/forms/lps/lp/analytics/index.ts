import { pushEvent } from '../../../../../../utilities/googleAnalytics';

type PageViewEventParams = {
  account: string;
  isEdit: boolean;
};

export const pushPageViewEvent = ({ account, isEdit }: PageViewEventParams) => {
  pushEvent(account || '', {
    event: 'title_change',
    eventValue: isEdit ? 'Edit Liquidity Provider Position' : 'New Liquidity Provider Position',
  });
};

export type LPEventParams = {
  notional: number;
  margin: number;
  isEdit: boolean;
  pool: string;
  account: string;
  fixedLow: number;
  fixedHigh: number;
};

export const pushLPTransactionSubmittedEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  account,
  fixedHigh,
  fixedLow,
}: LPEventParams) => {
  pushEvent(account, {
    event: 'tx_submitted',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
      fixedHigh,
      fixedLow,
    },
    pool,
    agent: 'Liquidity Provider',
  });
};

export const pushLPTransactionSuccessEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  account,
  fixedHigh,
  fixedLow,
}: LPEventParams) => {
  pushEvent(account, {
    event: 'successful_tx',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
      fixedHigh,
      fixedLow,
    },
    pool,
    agent: 'Liquidity Provider',
  });
};

type FailedSwapEventParams = LPEventParams & {
  errorMessage: string;
};
export const pushLPTransactionFailedEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  account,
  errorMessage,
  fixedHigh,
  fixedLow,
}: FailedSwapEventParams) => {
  pushEvent(account, {
    event: 'failed_tx',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
      failMessage: errorMessage,
      fixedHigh,
      fixedLow,
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
