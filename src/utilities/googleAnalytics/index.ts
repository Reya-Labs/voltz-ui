import { v4 as uuidv4 } from 'uuid';

const SESSION_ID = uuidv4();

type TxEventPayload = {
  notional: number | undefined;
  margin: number | undefined;
  action: string;
  failMessage?: string;
  fixedHigh?: number | undefined;
  fixedLow?: number | undefined;
};

type DepositFormEventPayload = {
  distribution: 'automatic' | 'manual';
  amount: number;
  action: string;
};

export type DataLayerEventPayload = {
  event: DataLayerEventName;
  eventValue: string | number | TxEventPayload | DepositFormEventPayload;
  pool?: string;
  agent?: 'Fixed Trader' | 'Variable Trader' | 'Liquidity Provider';
};

type DataLayerEventName =
  | 'expectedApy_change'
  | 'notional_change'
  | 'margin_change'
  // TODO: Soon deprecated
  | 'leverage_change'
  | 'leverage_change_button'
  | 'leverage_change_input'
  | 'title_change'
  | 'tx_submitted'
  | 'failed_tx'
  | 'successful_tx';

export const pushEvent = (userAddress: string, payload: DataLayerEventPayload) => {
  if (!window.dataLayer) {
    return;
  }
  window.dataLayer.push({ sessionId: SESSION_ID, userAddress: userAddress, ...payload });
};
