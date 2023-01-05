import { v4 as uuidv4 } from 'uuid';

import { Agents } from '../../contexts/AgentContext/types';

const SESSION_ID = uuidv4();

export type TxEventPayload = {
  notional: number | undefined;
  margin: number | undefined;
  action: string;
  failMessage?: string;
};

export type DataLayerEventPayload = {
  event: DataLayerEventName;
  eventValue: string | number | TxEventPayload;
  pool?: string;
  agent?: Agents;
};

type DataLayerEventName =
  | 'expectedApy_change'
  | 'notional_change'
  | 'margin_change'
  | 'leverage_change'
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
