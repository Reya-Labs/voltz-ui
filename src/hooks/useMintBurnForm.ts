import { isUndefined } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

export enum MintBurnFormLiquidityAction {
  ADD='add',
  BURN='burn'
};

export enum MintBurnFormMarginAction {
  ADD='add',
  REMOVE='remove'
};

export type MintBurnFormState = {
  fixedLow?: number;
  fixedHigh?: number;
  liquidityAction: MintBurnFormLiquidityAction;
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
};

export type MintBurnForm = {
  errors: Record<string, string>,
  setFixedHigh: Dispatch<SetStateAction<MintBurnFormState['fixedHigh']>>;
  setFixedLow: Dispatch<SetStateAction<MintBurnFormState['fixedLow']>>;
  setLiquidityAction: Dispatch<SetStateAction<MintBurnFormState['liquidityAction']>>;
  setMargin: Dispatch<SetStateAction<MintBurnFormState['margin']>>;
  setMarginAction: Dispatch<SetStateAction<MintBurnFormState['marginAction']>>;
  setNotional: Dispatch<SetStateAction<MintBurnFormState['notional']>>;
  state: MintBurnFormState,
  validate: () => void;
};

export const useMintBurnForm = (defaultValues: Partial<MintBurnFormState> = {}): MintBurnForm => {
  const defaultFixedHigh = !isUndefined(defaultValues.fixedHigh) ? defaultValues.fixedHigh : undefined;
  const defaultFixedLow = !isUndefined(defaultValues.fixedLow) ? defaultValues.fixedLow : undefined;
  const defaultLiquidityAction = defaultValues.liquidityAction || MintBurnFormLiquidityAction.ADD;
  const defaultMargin = !isUndefined(defaultValues.margin) ? defaultValues.margin : 0;
  const defaultMarginAction = defaultValues.marginAction || MintBurnFormMarginAction.ADD;
  const defaultNotional = !isUndefined(defaultValues.notional) ? defaultValues.notional : 0;

  const [fixedHigh, setFixedHigh] = useState<MintBurnFormState['fixedHigh']>(defaultFixedHigh);
  const [fixedLow, setFixedLow] = useState<MintBurnFormState['fixedLow']>(defaultFixedLow);
  const [liquidityAction, setLiquidityAction] = useState<MintBurnFormLiquidityAction>(defaultLiquidityAction);
  const [margin, setMargin] = useState<MintBurnFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const [notional, setNotional] = useState<MintBurnFormState['notional']>(defaultNotional);

  const [errors, setErrors] = useState<MintBurnForm['errors']>({});

  const validate = () => {
    setErrors({});
  }

  return {
    errors,
    setFixedHigh,
    setFixedLow,
    setLiquidityAction,
    setMargin,
    setMarginAction,
    setNotional,
    state: {
      fixedHigh,
      fixedLow,
      liquidityAction,
      margin,
      marginAction,
      notional
    },
    validate
  }
}

export default useMintBurnForm;