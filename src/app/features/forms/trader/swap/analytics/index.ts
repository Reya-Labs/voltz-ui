import { pushEvent } from '../../../../../../utilities/googleAnalytics';

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

export type SwapEventParams = {
  notional: number;
  pool: string;
  isFT: boolean;
  account: string;
};

export const pushSwapTransactionSubmittedEvent = ({
  notional,
  pool,
  isFT,
  account,
}: SwapEventParams) => {
  pushEvent(account, {
    event: 'tx_submitted',
    eventValue: {
      notional,
      margin: undefined,
      // TODO: FB evaluate before launch
      action: 'new',
    },
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};

export const pushSwapTransactionSuccessEvent = ({
  notional,
  pool,
  isFT,
  account,
}: SwapEventParams) => {
  pushEvent(account, {
    event: 'successful_tx',
    eventValue: {
      notional,
      margin: undefined,
      // TODO: FB evaluate before launch
      action: 'new',
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
  pool,
  isFT,
  account,
  errorMessage,
}: FailedSwapEventParams) => {
  pushEvent(account, {
    event: 'failed_tx',
    eventValue: {
      notional,
      margin: undefined,
      // TODO: FB evaluate before launch
      action: 'new',
      failMessage: errorMessage,
    },
    pool,
    agent: isFT ? 'Fixed Trader' : 'Variable Trader',
  });
};
