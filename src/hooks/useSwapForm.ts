import { useWallet } from "@hooks";
import { AugmentedAMM } from "@utilities";
import { Token } from "@voltz-protocol/v1-sdk";
import { BigNumber } from "ethers";
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
  balance: BigNumber | undefined;
  errors: Record<string, string>,
  isValid: boolean;
  setMargin: (value: SwapFormState['margin']) => void;
  setMarginAction: (value: SwapFormState['marginAction']) => void;
  setNotional: (value: SwapFormState['notional']) => void;
  setPartialCollateralization: (value: SwapFormState['partialCollateralization']) => void;
  state: SwapFormState;
  validate: () => boolean;
};

export const useSwapForm = (amm: AugmentedAMM, isEditingMargin: boolean, minimumRequiredMargin: number | undefined, defaultValues: Partial<SwapFormState> = {}): SwapFormData => {
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

  const [balance, setBalance] = useState<BigNumber>();
  const [errors, setErrors] = useState<SwapFormData['errors']>({});
  const { getTokenBalance } = useWallet();
  const [isValid, setIsValid] = useState<boolean>(false);
  const token = useRef<Token>();
  const touched = useRef<string[]>([]);

  // Load the users balance of the required token so we can use it for validation later
  useEffect(() => {
    if(token.current?.id !== amm.underlyingToken.id) {
      token.current = amm.underlyingToken;
      getTokenBalance(amm.underlyingToken)
        .then((currentBalance) => {
          setBalance(currentBalance);
        })
        .catch(() => {
          setBalance(undefined);
        })
    }
  }, [amm.underlyingToken, amm.underlyingToken.id, getTokenBalance]);

  // validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      validate();
    }
  }, [margin, marginAction, notional, partialCollateralization, minimumRequiredMargin])


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

  const validate = () => {
    if(!isEditingMargin) {
      return validateNewPosition();
    } else {
      return validateEditMargin();
    }
  }

  const validateNewPosition = () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(notional) || notional === 0) {
      valid = false;
      if(touched.current.includes('notional')) {
        err['notional'] = 'Please enter an amount';
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

  const validateEditMargin = () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(margin) || margin === 0) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }
    
    setErrors(err);
    setIsValid(valid)
    return valid;
  };

  return {
    balance,
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