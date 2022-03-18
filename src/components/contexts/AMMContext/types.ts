export type AMMDispatch = {
  loadVariableApy: () => void;
  variableApy: number | null;
  variableApyLoading: boolean;
  variableApyError: boolean;

  loadMinimumMarginAmount: () => void;
  minimumMarginAmount: number | null;
  minimumMarginAmountLoading: boolean;
  minimumMarginAmountError: boolean;
};
