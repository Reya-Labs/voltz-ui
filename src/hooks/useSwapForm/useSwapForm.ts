import { Agents, GetInfoType } from "@components/contexts";
import { SwapFormActions, SwapFormModes } from "@components/interface";
import { AugmentedAMM } from "@utilities";
import { isUndefined } from "lodash";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MintBurnFormMarginAction } from "../useMintBurnForm";
import { hasEnoughTokens, hasEnoughUnderlyingTokens, lessThan } from "@utilities";
import { useAgent, useAMMContext, useTokenApproval } from "@hooks";
import { InfoPostSwap } from "@voltz-protocol/v1-sdk";
import { getFormAction, getSubmitButtonHint, getSubmitButtonText } from "./services";

export type SwapFormState = {
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
  partialCollateralization: boolean;
};

export type SwapFormData = {
  action: SwapFormActions;
  errors: Record<string, string>;
  isAddingMargin: boolean,
  isRemovingMargin: boolean;
  isValid: boolean;
  setMargin: (value: SwapFormState['margin']) => void;
  setMarginAction: (value: SwapFormState['marginAction']) => void;
  setNotional: (value: SwapFormState['notional']) => void;
  setPartialCollateralization: (value: SwapFormState['partialCollateralization']) => void;
  state: SwapFormState;
  swapInfo: {
    data?: InfoPostSwap;
    loading: boolean;
  }
  submitButtonHint: ReactNode;
  submitButtonText: ReactNode;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  validate: () => Promise<boolean>;
};

export const useSwapForm = (
  amm: AugmentedAMM, 
  mode: SwapFormModes,
  defaultValues: Partial<SwapFormState> = {}
): SwapFormData => {
  const defaultMargin = !isUndefined(defaultValues.margin) ? defaultValues.margin : 0;
  const defaultMarginAction = defaultValues.marginAction || MintBurnFormMarginAction.ADD;
  const defaultNotional = !isUndefined(defaultValues.notional) ? defaultValues.notional : 0;
  const defaultPartialCollateralization = !isUndefined(defaultValues.partialCollateralization) 
    ? defaultValues.partialCollateralization 
    : true;

  const { agent } = useAgent();
  const [margin, setMargin] = useState<SwapFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const [notional, setNotional] = useState<SwapFormState['notional']>(defaultNotional);
  const [partialCollateralization, setPartialCollateralization] = useState<boolean>(defaultPartialCollateralization);
  const { swapInfo } = useAMMContext();
  const tokenApprovals = useTokenApproval(amm);

  const [errors, setErrors] = useState<SwapFormData['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);

  const action = getFormAction(mode, partialCollateralization, agent);
  const isAddingMargin = mode === SwapFormModes.EDIT_MARGIN && marginAction === MintBurnFormMarginAction.ADD;
  const isRemovingMargin = mode === SwapFormModes.EDIT_MARGIN && marginAction === MintBurnFormMarginAction.REMOVE;
  const submitButtonHint = getSubmitButtonHint(amm, action, errors, isValid, tokenApprovals, isRemovingMargin);
  const submitButtonText = getSubmitButtonText(mode, tokenApprovals, amm, action, agent, isRemovingMargin);
  
  // Load the swap summary info
  useEffect(() => {
    if (!isUndefined(notional) && notional !== 0) {
      switch (action) {
        case SwapFormActions.SWAP: {
          swapInfo.call({ notional, type: GetInfoType.NORMAL_SWAP});
          break;
        }

        case SwapFormActions.FCM_SWAP: {
          swapInfo.call({ notional, type: GetInfoType.FCM_SWAP });
          break;
        }

        case SwapFormActions.FCM_UNWIND: {
          swapInfo.call({ notional, type: GetInfoType.FCM_UNWIND });
          break;
        }
      } 
    }
  }, [swapInfo.call, notional, agent]);

  // Validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      void validate();
    }
  }, [
    margin, 
    marginAction, 
    notional, 
    partialCollateralization,
    swapInfo.result?.marginRequirement, 
    swapInfo.result?.fee
  ])

  const addError = (err: Record<string, string>, name: string, message: string) => {
    if(touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const updateMargin = (value: SwapFormState['margin']) => {
    if(!touched.current.includes('margin')) {
      touched.current.push('margin');
    }
    setMargin(value);
  }

  const updateMarginAction = (value: SwapFormState['marginAction']) => {
    if(!touched.current.includes('marginAction')) {
      touched.current.push('marginAction');
    }
    setMarginAction(value);
  }

  const updateNotional = (value: SwapFormState['notional']) => {
    if(!touched.current.includes('notional')) {
      touched.current.push('notional');
    }
    setNotional(value);
  }

  const updatePartialCollateralization = (value: SwapFormState['partialCollateralization']) => {
    if(!touched.current.includes('partialCollateralization')) {
      touched.current.push('partialCollateralization');
    }
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
      addError(err, 'notional', 'Please enter an amount');
    }

    if((isUndefined(margin) || margin === 0) && partialCollateralization) {
      valid = false;
      addError(err, 'margin', 'Please enter an amount');
    }

    // Check the user has enough balance
    if(partialCollateralization) {
      // Swap or update
      if(margin !== 0 && await hasEnoughUnderlyingTokens(amm, margin) === false) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    }
    else {
      if(agent === Agents.FIXED_TRADER) {
        // FCM Swap
        if(notional !== 0 && await hasEnoughTokens(amm, swapInfo.result?.fee, notional) === false) {
          valid = false;
          addError(err, 'notional', 'Insufficient funds');
        }
      } else {
        // FCM unwind
        if(await hasEnoughUnderlyingTokens(amm, swapInfo.result?.fee) === false) {
          valid = false;
          addError(err, 'notional', 'Insufficient funds');
        }
      }
    }

    // Check that the input margin is >= minimum required margin
    if(margin !== 0 && lessThan(margin, swapInfo.result?.marginRequirement) === true) {
      valid = false;
      addError(err, 'margin', 'Not enough margin');
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
      addError(err, 'margin', 'Please enter an amount');
    }

    // check user has sufficient funds
    if(marginAction === MintBurnFormMarginAction.ADD) {
      if(margin !== 0 && await hasEnoughUnderlyingTokens(amm, margin) === false) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    }
    
    setErrors(err);
    setIsValid(valid)
    return valid;
  };

  return {
    action,
    errors,
    isAddingMargin,
    isRemovingMargin,
    isValid,
    setMargin: updateMargin,
    setMarginAction: updateMarginAction,
    setNotional: updateNotional,
    setPartialCollateralization: updatePartialCollateralization,
    swapInfo: {
      data: swapInfo.result || undefined,
      loading: swapInfo.loading,
    },
    state: {
      margin,
      marginAction,
      notional,
      partialCollateralization
    },
    submitButtonHint,
    submitButtonText,
    tokenApprovals,
    validate
  }
}

export default useSwapForm;