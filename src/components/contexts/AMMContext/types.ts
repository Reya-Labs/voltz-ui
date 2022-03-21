export type MinimumMarginAmountPayload = {
  fixedLow: number;
  fixedHigh: number;
  notional: number;
};

export type AMMDispatch = {
  loadVariableApy: () => void;
  variableApy: number | null;
  variableApyLoading: boolean;
  variableApyError: boolean;
  loadMinimumMarginAmount: (payload: MinimumMarginAmountPayload) => void;
  minimumMarginAmount: number | null;
  minimumMarginAmountLoading: boolean;
  minimumMarginAmountError: boolean;
};
