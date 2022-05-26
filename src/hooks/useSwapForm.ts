import { Agents } from "@components/contexts";
import { SwapFormModes } from "@components/interface";
import { AugmentedAMM } from "@utilities";
import { isUndefined } from "lodash";
import { useEffect, useRef, useState } from "react";
import { MintBurnFormMarginAction } from "./useMintBurnForm";

export type SwapFormState = {
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
  partialCollateralization: boolean;
};

export type SwapFormData = {
  errors: Record<string, string>,
  isValid: boolean;
  setMargin: (value: SwapFormState['margin']) => void;
  setMarginAction: (value: SwapFormState['marginAction']) => void;
  setNotional: (value: SwapFormState['notional']) => void;
  setPartialCollateralization: (value: SwapFormState['partialCollateralization']) => void;
  state: SwapFormState;
  validate: () => Promise<boolean>;
};

export const useSwapForm = (
  amm: AugmentedAMM, 
  mode: SwapFormModes, 
  minimumRequiredMargin: number | undefined,
  fees: number | undefined,
  agent: Agents,
  defaultValues: Partial<SwapFormState> = {}
): SwapFormData => {
  const defaultMargin = !isUndefined(defaultValues.margin) ? defaultValues.margin : 0;
  const defaultMarginAction = defaultValues.marginAction || MintBurnFormMarginAction.ADD;
  const defaultNotional = !isUndefined(defaultValues.notional) ? defaultValues.notional : 0;
  const defaultPartialCollateralization = !isUndefined(defaultValues.partialCollateralization) 
    ? defaultValues.partialCollateralization 
    : true;

  const [margin, setMargin] = useState<SwapFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const [notional, setNotional] = useState<SwapFormState['notional']>(defaultNotional);
  const [partialCollateralization, setPartialCollateralization] = useState<boolean>(defaultPartialCollateralization);

  const [errors, setErrors] = useState<SwapFormData['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);

  // validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      validate();
    }
  }, [margin, marginAction, notional, partialCollateralization, minimumRequiredMargin, fees])

  const updateMargin = (value: SwapFormState['margin']) => {
    touched.current.push('margin');
    setMargin(value);
  }

  const updateMarginAction = (value: SwapFormState['marginAction']) => {
    touched.current.push('marginAction');
    setMarginAction(value);
  }

  const updateNotional = (value: SwapFormState['notional']) => {
    touched.current.push('notional');
    setNotional(value);
  }

  const updatePartialCollateralization = (value: SwapFormState['partialCollateralization']) => {
    touched.current.push('partialCollateralization');
    setPartialCollateralization(value);
  }

  const validate = async () => {
    if(mode === SwapFormModes.NEW_POSITION) {
      return await validateNewPosition();
    } else {
      return await validateEditMargin();
    }
  }

  const validateNewPosition = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(notional) || notional === 0) {
      valid = false;
      if(touched.current.includes('notional')) {
        err['notional'] = 'Please enter an amount';
      }
    }

    if((isUndefined(margin) || margin === 0) && partialCollateralization) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }

    if(partialCollateralization) {
      if(!isUndefined(margin) && margin !== 0) {
        try {
          const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(margin);
          if(!hasEnoughFunds) {
            valid = false;
            if(touched.current.includes('margin')) {
              err['margin'] = 'Insufficient funds';
            }
          }
        } catch(e) {
          // If error, just skip this check
        }
      }
    }
    else {
      if(agent === Agents.FIXED_TRADER) {
        // FCM Swap - check the user has enough funds
        if(!isUndefined(fees) && !isUndefined(notional) && notional !== 0) {
          try {
            const results = await Promise.allSettled([
              amm.hasEnoughUnderlyingTokens(fees), 
              amm.hasEnoughYieldBearingTokens(notional)
            ]);
            if(results[0].status === 'fulfilled' && results[1].status === 'fulfilled') {
              if(results[0].value === false || results[1].value === false) {
                valid = false;
                if(touched.current.includes('notional')) {
                  err['notional'] = 'Insufficient funds';
                }
              }
            }
          } catch(e) {
            // If error, just skip this check
          }
        }
      } else {
        // FCM Unwind
        if(!isUndefined(fees) && !isUndefined(notional) && notional !== 0) {
          try {
            const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(fees);
            if(!hasEnoughFunds) {
              valid = false;
              if(touched.current.includes('margin')) {
                err['notional'] = 'Insufficient funds';
              }
            }
          } catch(e) {
            // If error, just skip this check
          }
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
        try {
          const hasEnoughFunds = await amm.hasEnoughUnderlyingTokens(margin);
          if(!hasEnoughFunds) {
            valid = false;
            if(touched.current.includes('margin')) {
              err['margin'] = 'Insufficient funds';
            }
          }
        } catch(e) {
          // If error, just skip this check
        }
      }
    }
    
    setErrors(err);
    setIsValid(valid)
    return valid;
  };

  return {
    errors,
    isValid,
    setMargin: updateMargin,
    setMarginAction: updateMarginAction,
    setNotional: updateNotional,
    setPartialCollateralization: updatePartialCollateralization,
    state: {
      margin,
      marginAction,
      notional,
      partialCollateralization
    },
    validate
  }
}

export default useSwapForm;