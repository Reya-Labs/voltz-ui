import { v4 as uuidv4 } from 'uuid';

import { Agents } from '../contexts/AgentContext/types';
import { SwapFormSubmitButtonHintStates } from '../contexts/SwapFormContext/enums';

const SESSION_ID = uuidv4();

export const getPoolButtonId = (
  marginAction: string,
  liquidityAction: string,
  notionalAction: string,
  agent: Agents,
  isBorrowing: boolean,
  protocol: string,
): string => {
  const showBorrow = isBorrowing ? '_borrow' : '';

  const showAgent =
    agent === Agents.LIQUIDITY_PROVIDER ? 'lp' : agent === Agents.FIXED_TRADER ? 'ft' : 'vt';
  return `Protocol:${protocol}${showBorrow}_MarginAction:${marginAction}_LiquidityAction:${liquidityAction}_NotionalAction:${notionalAction}_Agent:${showAgent}`;
};

export const getRowButtonId = (isLp: boolean, protocol: string, borrow?: boolean): string => {
  const showBorrow = borrow ? '_borrow' : '';
  const showAgent = isLp ? 'lp' : 'trader';
  return `ROW_Protocol:${protocol}${showBorrow}_Agent:${showAgent}`;
};

export const getNotionalActionFromHintState = (hint: SwapFormSubmitButtonHintStates): string => {
  switch (hint) {
    case SwapFormSubmitButtonHintStates.REMOVE_AND_ADD:
    case SwapFormSubmitButtonHintStates.REMOVE_AND_REMOVE:
      return 'REMOVE';
    case SwapFormSubmitButtonHintStates.ADD_AND_ADD:
    case SwapFormSubmitButtonHintStates.ADD_AND_REMOVE:
      return 'ADD';
    default:
      return '';
  }
};

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
