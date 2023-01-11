import { Agents } from '../../contexts/AgentContext/types';

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
