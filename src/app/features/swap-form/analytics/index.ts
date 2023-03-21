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
