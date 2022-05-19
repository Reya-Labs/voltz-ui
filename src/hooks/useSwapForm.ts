import { useWallet } from "@hooks";
import { AugmentedAMM } from "@utilities";
import { Token } from "@voltz-protocol/v1-sdk";
import { BigNumber } from "ethers";
import { isUndefined } from "lodash";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { MintBurnFormMarginAction } from "./useMintBurnForm";

export type SwapFormState = {
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
  partialCollateralization: boolean;
};

export type SwapForm = {
  balance: BigNumber | undefined;
  errors: Record<string, string>,
  setMargin: Dispatch<SetStateAction<SwapFormState['margin']>>;
  setMarginAction: Dispatch<SetStateAction<SwapFormState['marginAction']>>;
  setNotional: Dispatch<SetStateAction<SwapFormState['notional']>>;
  setPartialCollateralization: Dispatch<SetStateAction<SwapFormState['partialCollateralization']>>;
  state: SwapFormState,
  validate: (isEditingMargin: boolean) => boolean;
};

export const useSwapForm = (amm: AugmentedAMM, defaultValues: Partial<SwapFormState> = {}): SwapForm => {
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
  const [errors, setErrors] = useState<SwapForm['errors']>({});
  const { getTokenBalance } = useWallet();
  const token = useRef<Token>();

  // Load the users balance of the required token so we can use it for validation later
  useEffect(() => {
    if(token.current?.id !== amm.underlyingToken.id) {
      token.current = amm.underlyingToken;
      // eslint-disable-next-line
      getTokenBalance(amm.underlyingToken)
        .then((currentBalance: BigNumber | void) => {
          setBalance(currentBalance || undefined);
        })
        .catch(() => {
          setBalance(undefined);
        })
    }
  }, [amm.underlyingToken.id, getTokenBalance]);

  const validate = (isEditingMargin: boolean,) => {
    if(!isEditingMargin) {
      return validateNewPosition();
    } else {
      return validateEditMargin();
    }
  }

  const validateNewPosition = () => {
    const err: Record<string, string> = {};

    if(isUndefined(notional) || notional === 0) {
      err['notional'] = 'Please enter an amount';
    } 

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateEditMargin = () => {
    const err: Record<string, string> = {};

    if(isUndefined(margin) || margin === 0) {
      err['margin'] = 'Please enter an amount';
    }
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  return {
    balance,
    errors,
    setMargin,
    setMarginAction,
    setNotional,
    setPartialCollateralization,
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