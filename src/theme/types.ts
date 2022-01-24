export enum Agents {
  FIXED_TRADER = 'Fixed Trader',
  VARIABLE_TRADER = 'Variable Trader',
  LIQUIDITY_PROVIDER = 'Liquidity Provider',
}

export type AgentProps = {
  agent?: Agents;
};

export type AgentColors = {
  light: NonNullable<React.CSSProperties['color']>;
  dark: NonNullable<React.CSSProperties['color']>;
};

declare module '@mui/system' {
  interface Theme {
    agent: {
      [Agents.FIXED_TRADER]: AgentColors;
      [Agents.VARIABLE_TRADER]: AgentColors;
      [Agents.LIQUIDITY_PROVIDER]: AgentColors;
    };
  }

  interface ThemeOptions {
    agent: {
      [Agents.FIXED_TRADER]: AgentColors;
      [Agents.VARIABLE_TRADER]: AgentColors;
      [Agents.LIQUIDITY_PROVIDER]: AgentColors;
    };
  }
}
