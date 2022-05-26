import { AugmentedAMM } from "@utilities";
import { isUndefined } from "lodash";
import { useEffect, useRef, useState } from "react";
import { MintBurnFormModes } from "@components/interface";

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
  isValid: boolean;
  setFixedHigh: (value: MintBurnFormState['fixedHigh']) => void;
  setFixedLow: (value: MintBurnFormState['fixedLow']) => void;
  setLiquidityAction: (value: MintBurnFormState['liquidityAction']) => void;
  setMargin: (value: MintBurnFormState['margin']) => void;
  setMarginAction: (value: MintBurnFormState['marginAction']) => void;
  setNotional: (value: MintBurnFormState['notional']) => void;
  state: MintBurnFormState,
  validate: () => void;
};

export const useMintBurnForm = (
  amm: AugmentedAMM, 
  mode: MintBurnFormModes,
  minimumRequiredMargin: number | undefined, 
  defaultValues: Partial<MintBurnFormState> = {}
): MintBurnForm => {
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
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);

  const isAddingLiquidity = mode !== MintBurnFormModes.EDIT_LIQUIDITY || liquidityAction === MintBurnFormLiquidityAction.ADD;

  // validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      validate();
    }
  }, [fixedHigh, fixedLow, liquidityAction, margin, marginAction, notional, minimumRequiredMargin]);

  const updateFixedHigh = (value: MintBurnFormState['fixedHigh']) => {
    if(!touched.current.includes('fixedHigh')) {
      touched.current.push('fixedHigh');
    } 
    setFixedHigh(value);
  }

  const updateFixedLow = (value: MintBurnFormState['fixedLow']) => {
    if(!touched.current.includes('fixedLow')) {
      touched.current.push('fixedLow');
    }
    setFixedLow(value);
  }

  const updateLiquidityAction = (value: MintBurnFormState['liquidityAction']) => {
    if(!touched.current.includes('liquidityAction')) {
      touched.current.push('liquidityAction');
    }
    setLiquidityAction(value);
  }

  const updateMargin = (value: MintBurnFormState['margin']) => {
    if(!touched.current.includes('margin')) {
      touched.current.push('margin');
    }
    setMargin(value);
  }

  const updateMarginAction = (value: MintBurnFormState['marginAction']) => {
    if(!touched.current.includes('marginAction')) {
      touched.current.push('marginAction');
    }
    setMarginAction(value);
  }

  const updateNotional = (value: MintBurnFormState['notional']) => {
    if(!touched.current.includes('notional')) {
      touched.current.push('notional');
    }
    setNotional(value);
  }

  const validate = () => {
    if(mode === MintBurnFormModes.NEW_POSITION) {
      validateNewPosition();
    } else if(mode === MintBurnFormModes.EDIT_MARGIN) {
      validateEditMargin();
    } else {
      validateEditLiquidity();
    }
  }

  const validateNewPosition = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(fixedLow)) {
      valid = false;
      if(touched.current.includes('fixedLow')) {
        err['fixedLow'] = 'Please enter a value';
      }
    }

    if(isUndefined(fixedHigh)) {
      valid = false;
      if(touched.current.includes('fixedHigh')) {
        err['fixedHigh'] = 'Please enter a value';
      }
    }
      
    if(!isUndefined(fixedLow) && !isUndefined(fixedHigh) && fixedLow >= fixedHigh) {
      valid = false;
      if(touched.current.includes('fixedHigh') || touched.current.includes('fixedLow')) {
        err['fixedLow'] = 'Lower Rate must be smaller than Upper Rate';
      }
    }

    if(isUndefined(notional) || notional === 0) {
      valid = false;
      if(touched.current.includes('notional')) {
        err['notional'] = 'Please enter an amount';
      }
    } 

    if(isUndefined(margin) || margin === 0) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }    

    if(!isUndefined(margin) && margin !== 0) {
      const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(margin);
      if(!hasEnoughFunds) {
        valid = false;
        if(touched.current.includes('margin')) {
          err['margin'] = 'Insufficient funds';
        }
      }
    }

    // Check that the input margin is >= minimum required margin
    if(!isUndefined(minimumRequiredMargin) && !isUndefined(margin) && margin !== 0 && margin < minimumRequiredMargin) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Not enough margin';
      }
    }
    
    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  const validateEditMargin = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(margin) || margin === 0) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }

    if(marginAction === MintBurnFormMarginAction.ADD) {
      // check user has sufficient funds
      if(!isUndefined(margin) && margin !== 0) {
        const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(margin);
        if(!hasEnoughFunds) {
          valid = false;
          if(touched.current.includes('margin')) {
            err['margin'] = 'Insufficient funds';
          }
        }
      }
    }
    
    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  const validateEditLiquidity = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(notional) || notional === 0) {
      valid = false;
      if(touched.current.includes('notional')) {
        err['notional'] = 'Please enter an amount';
      }
    } 

    if(isUndefined(margin)) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }

    if(liquidityAction === MintBurnFormLiquidityAction.ADD) {
      // check user has sufficient funds
      if(!isUndefined(margin) && margin !== 0) {
        const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(margin);
        if(!hasEnoughFunds) {
          valid = false;
          if(touched.current.includes('margin')) {
            err['margin'] = 'Insufficient funds';
          }
        }
      }
    }

    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  return {
    errors,
    isValid,
    setFixedHigh: updateFixedHigh,
    setFixedLow: updateFixedLow,
    setLiquidityAction: updateLiquidityAction,
    setMargin: updateMargin,
    setMarginAction: updateMarginAction,
    setNotional: updateNotional,
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