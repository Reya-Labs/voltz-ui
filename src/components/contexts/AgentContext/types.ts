export enum Agents {
  FIXED_TRADER = 'Fixed Trader',
  VARIABLE_TRADER = 'Variable Trader',
  LIQUIDITY_PROVIDER = 'Liquidity Provider',
}

export type AgentSettings = {
  agent: Agents;
  onChangeAgent: (agent: Agents) => void;
};

export type AgentProps = {
  agent?: Agents;
};
