import { pushEvent } from '../../../../utilities/googleAnalytics';

type PageViewEventParams = {
  account: string;
  isEdit: boolean;
};
export const pushPageViewEvent = ({ account, isEdit }: PageViewEventParams) => {
  pushEvent(account || '', {
    event: 'title_change',
    eventValue: isEdit ? 'New Trader Position' : 'Edit Trader Position',
  });
};

type SwapEventParams = {
  notional: number;
  margin: number;
  isEdit: boolean;
  pool: string;
  isFT: boolean;
  account: string;
};

export const pushSwapTransactionSubmittedEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  isFT,
  account,
}: SwapEventParams) => {
  pushEvent(account, {
    event: 'tx_submitted',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
    },
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

export const pushSwapTransactionSuccessEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  isFT,
  account,
}: SwapEventParams) => {
  pushEvent(account, {
    event: 'successful_tx',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
    },
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

type FailedSwapEventParams = SwapEventParams & {
  errorMessage: string;
};
export const pushSwapTransactionFailedEvent = ({
  notional,
  margin,
  isEdit,
  pool,
  isFT,
  account,
  errorMessage,
}: FailedSwapEventParams) => {
  pushEvent(account, {
    event: 'failed_tx',
    eventValue: {
      notional,
      margin,
      action: isEdit ? 'edit' : 'new',
      failMessage: errorMessage,
    },
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

type EstimatedApyChangeEventParams = {
  estimatedApy: number;
  pool: string;
  isFT: boolean;
  account: string;
};
export const pushEstimatedApyChangeEvent = ({
  account,
  estimatedApy,
  isFT,
  pool,
}: EstimatedApyChangeEventParams) => {
  pushEvent(account || '', {
    event: 'expectedApy_change',
    eventValue: estimatedApy,
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
