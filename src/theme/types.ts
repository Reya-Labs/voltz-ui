export enum Agents {
  FIXED_TRADER = 'Fixed Trader',
  VARIABLE_TRADER = 'Variable Trader',
  LIQUIDITY_PROVIDER = 'Liquidity Provider',
}

export type VzMode = {
  mode: Agents;
};
