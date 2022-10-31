/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Agents, SwapFormSubmitButtonHintStates } from '@contexts';
import { isUndefined } from 'lodash';
import AugmentedAMM from './augmentedAmm';
import isBorrowing from './isBorrowing';
import { v4 as uuidv4 } from 'uuid';

const SESSION_ID = uuidv4();

export const getPoolButtonId = (
  marginAction: string,
  liquidityAction: string,
  notionalAction: string,
  agent: Agents,
  amm?: AugmentedAMM,
  borrow?: boolean,
): string => {
  const protocol = amm ? amm.protocol : '';
  let showBorrow = '';
  if (isUndefined(borrow)) {
    if (amm) showBorrow = isBorrowing(amm.rateOracle.protocolId) ? '_borrow' : '';
  } else {
    showBorrow = borrow ? '_borrow' : '';
  }
  const showAgent =
    agent == Agents.LIQUIDITY_PROVIDER ? 'lp' : agent === Agents.FIXED_TRADER ? 'ft' : 'vt';
  return (
    'Protocol:' +
    protocol +
    showBorrow +
    '_MarginAction:' +
    marginAction +
    '_LiquidityAction:' +
    liquidityAction +
    '_NotionalAction:' +
    notionalAction +
    '_Agent:' +
    showAgent
  );
};

export const getRowButtonId = (isLp: boolean, protocol: string, borrow?: boolean): string => {
  const showBorrow = borrow ? '_borrow' : '';
  const showAgent = isLp ? 'lp' : 'trader';
  return 'ROW_Protocol:' + protocol + showBorrow + '_Agent:' + showAgent;
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
