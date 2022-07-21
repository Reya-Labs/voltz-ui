import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Agents, useAMMContext } from "@contexts";
import { SwapFormActions, SwapFormModes } from "@components/interface";
import { AugmentedAMM } from "@utilities";
import { isNumber, isUndefined } from "lodash";
import { hasEnoughTokens, hasEnoughUnderlyingTokens, lessThan } from "@utilities";
import { GetInfoType, useAgent, useBalance, useMinRequiredMargin, useTokenApproval } from "@hooks";
import { InfoPostSwap, Position } from "@voltz-protocol/v1-sdk";
import * as s from "./services";
import { BigNumber } from "ethers";

export enum SwapFormMarginAction {
  ADD='add',
  REMOVE='remove'
};

export enum SwapFormSubmitButtonStates {
  APPROVE_FCM = 'APPROVE_FCM',
  APPROVE_UT_FCM = 'APPROVE_UT_FCM',
  APPROVE_UT_PERIPHERY = 'APPROVE_UT_PERIPHERY',
  APPROVE_YBT_FCM = 'APPROVE_YBT_FCM',
  APPROVING = 'APPROVING',
  CHECKING = 'CHECKING',
  INITIALISING = 'INITIALISING',
  TRADE_FIXED = 'TRADE_FIXED',
  TRADE_VARIABLE = 'TRADE_VARIABLE',
  UPDATE = 'UPDATE',
};

export enum SwapFormSubmitButtonHintStates {
  APPROVE_NEXT_TOKEN = 'APPROVE_NEXT_TOKEN',
  APPROVE_TOKEN = 'APPROVE_TOKEN',
  APPROVING = 'APPROVING',
  CHECKING = 'CHECKING',
  ERROR_TOKEN_APPROVAL = 'ERROR_TOKEN_APPROVAL',
  FORM_INVALID = 'FORM_INVALID',
  FORM_INVALID_BALANCE = 'FORM_INVALID_BALANCE',
  FORM_INVALID_INCOMPLETE = 'FORM_INVALID_INCOMPLETE',
  FORM_INVALID_TRADE = 'FORM_INVALID_TRADE',
  INITIALISING = 'INITIALISING',
  READY_TO_TRADE_TOKENS_APPROVED = 'READY_TO_TRADE_TOKENS_APPROVED',
  READY_TO_TRADE = 'READY_TO_TRADE'
};

export type SwapFormState = {
  leverage: number;
  margin?: number;
  marginAction: SwapFormMarginAction;
  notional?: number;
  partialCollateralization: boolean;
};

export type SwapFormProviderProps = {
  amm: AugmentedAMM;
  mode?: SwapFormModes;
  position?: Position;
  defaultValues?: Partial<SwapFormState>;
}

export type SwapFormContext = {
  action: SwapFormActions;
  amm: AugmentedAMM;
  approvalsNeeded: boolean;
  balance?: number;
  errors: Record<string, string>;
  hintState: SwapFormSubmitButtonHintStates;
  isAddingMargin: boolean;
  isFCMAction: boolean;
  isRemovingMargin: boolean;
  isTradeVerified: boolean;
  isValid: boolean;
  minRequiredMargin?: number;
  mode: SwapFormModes;
  position?: Position;
  ratesMoveBy: number;
  setLeverage: (value: SwapFormState['leverage']) => void;
  setMargin: (value: SwapFormState['margin']) => void;
  setMarginAction: (value: SwapFormState['marginAction']) => void;
  setNotional: (value: SwapFormState['notional']) => void;
  setPartialCollateralization: (value: SwapFormState['partialCollateralization']) => void;
  setRatesMoveBy: (value: number) => void;
  state: SwapFormState;
  swapInfo: {
    data?: InfoPostSwap;
    errorMessage?: string;
    loading: boolean;
  }
  submitButtonState: SwapFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  validate: () => Promise<boolean>;
};

const SwapFormCtx = createContext<SwapFormContext>({} as unknown as SwapFormContext);

export const SwapFormProvider: React.FunctionComponent<SwapFormProviderProps> = ({ 
  amm, 
  children, 
  defaultValues = {}, 
  mode = SwapFormModes.NEW_POSITION,
  position
}) => {
  const defaultLeverage = defaultValues.leverage ?? 10;
  const defaultMargin = defaultValues.margin ?? undefined;
  const defaultMarginAction = defaultValues.marginAction || SwapFormMarginAction.ADD;
  const defaultNotional = defaultValues.notional ?? undefined;
  const defaultPartialCollateralization = !isUndefined(defaultValues.partialCollateralization) 
    ? defaultValues.partialCollateralization 
    : true;

  const ammCtx = useAMMContext();
  const { agent } = useAgent();
  const balance = useBalance(amm);
  const [leverage, setLeverage] = useState<SwapFormState['leverage']>(defaultLeverage);
  const [margin, setMargin] = useState<SwapFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<SwapFormMarginAction>(defaultMarginAction);
  const minRequiredMargin = useMinRequiredMargin(amm);
  const [notional, setNotional] = useState<SwapFormState['notional']>(defaultNotional);
  const [partialCollateralization, setPartialCollateralization] = useState<boolean>(defaultPartialCollateralization);
  const [ratesMoveBy, setRatesMoveBy] = useState<number>(-1);
  const { swapInfo } = useAMMContext();
  const [cachedSwapInfoMinRequiredMargin, setCachedSwapInfoMinRequiredMargin] = useState<number>();
  const tokenApprovals = useTokenApproval(amm);

  const [errors, setErrors] = useState<SwapFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);

  const action = s.getFormAction(mode, partialCollateralization, agent);
  const isAddingMargin = mode === SwapFormModes.EDIT_MARGIN && marginAction === SwapFormMarginAction.ADD;
  const isFCMAction = action === SwapFormActions.FCM_SWAP || action === SwapFormActions.FCM_UNWIND;
  const isRemovingMargin = mode === SwapFormModes.EDIT_MARGIN && marginAction === SwapFormMarginAction.REMOVE;
  const isTradeVerified = !!swapInfo.result && !swapInfo.loading && !swapInfo.errorMessage;
  
  const approvalsNeeded = s.approvalsNeeded(action, tokenApprovals, isRemovingMargin)

  // Load the fixed APR
  useEffect(() => {
    ammCtx.fixedApr.call();
  }, [])

  // cache the minRequiredMargin from swapInfo
  useEffect(() => {
    if(isNumber(swapInfo.result?.marginRequirement)) {
      setCachedSwapInfoMinRequiredMargin(swapInfo.result?.marginRequirement);
    }
  }, [swapInfo.result?.marginRequirement])

  // Load the swap summary info
  useEffect(() => {
    if (!approvalsNeeded && !isUndefined(notional) && notional !== 0) {
      const expectedApr = isNumber(ammCtx.fixedApr.result) ? ammCtx.fixedApr.result + ratesMoveBy : undefined;

      switch (action) {
        case SwapFormActions.SWAP: {
          swapInfo.call({ 
            expectedApr,
            margin,
            notional, 
            type: GetInfoType.NORMAL_SWAP
          });
          break;
        }

        case SwapFormActions.FCM_SWAP: {
          swapInfo.call({ 
            expectedApr,
            margin,
            notional, 
            type: GetInfoType.FCM_SWAP 
          });
          break;
        }

        // case SwapFormActions.FCM_UNWIND: {
        //   swapInfo.call({ notional, type: GetInfoType.FCM_UNWIND });
        //   break;
        // }
      } 
    }
  }, [
    swapInfo.call,
    notional,
    agent,
    approvalsNeeded,
    partialCollateralization,
    marginAction,
    ammCtx.fixedApr.result,
    ratesMoveBy,
    margin
  ]);

  // set the leverage back to 50% if variables change
  useEffect(() => {
    const minMargin = cachedSwapInfoMinRequiredMargin;
    if(isNumber(notional) && isNumber(minMargin)) {
      const cappedMinMargin = Math.max(minMargin, 0.1);
      const newLeverage = parseFloat(((notional / cappedMinMargin) / 2).toFixed(2));
      setLeverage(newLeverage);
    }
  }, [notional, cachedSwapInfoMinRequiredMargin]);

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
    swapInfo.result?.fee,
    isValid
  ])

  const addError = (err: Record<string, string>, name: string, message: string) => {
    if(touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const getHintState = () => {
    // Please note that the order these are in is important, you need the conditions that take precidence
    // to be nearer the top.

    // Token approvals - Checking current status
    if(tokenApprovals.checkingApprovals) {
      return SwapFormSubmitButtonHintStates.INITIALISING;
    }
    if(tokenApprovals.approving) {
      return SwapFormSubmitButtonHintStates.APPROVING;
    }
    if (swapInfo.loading) {
      return SwapFormSubmitButtonHintStates.CHECKING;
    }

    // Form validation
    if (!isValid) {
      if(errors.balance) {
        return SwapFormSubmitButtonHintStates.FORM_INVALID_BALANCE;
      }
      if(!Object.keys(errors).length) {
        return SwapFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE;
      }
      return SwapFormSubmitButtonHintStates.FORM_INVALID;
    }

    if(!isRemovingMargin) {
      if(tokenApprovals.lastError) {
        return SwapFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL;
      }
      
      if(tokenApprovals.getNextApproval(isFCMAction)) {
        if(tokenApprovals.lastApproval) {
          return SwapFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN;
        } else {
          return SwapFormSubmitButtonHintStates.APPROVE_TOKEN;
        }
      }
    }

    // trade info failed
    if (swapInfo.errorMessage) {
      return SwapFormSubmitButtonHintStates.FORM_INVALID_TRADE;
    }

    if(tokenApprovals.lastApproval) {
      return SwapFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      return SwapFormSubmitButtonHintStates.READY_TO_TRADE;
    }
  }

  const getSubmitButtonState = () => {  
    if (tokenApprovals.checkingApprovals) {
      return SwapFormSubmitButtonStates.INITIALISING;
    }
    if (tokenApprovals.approving) {
      return SwapFormSubmitButtonStates.APPROVING;
    }
    if (swapInfo.loading) {
      return SwapFormSubmitButtonStates.CHECKING;
    }

    if(!isRemovingMargin) {
      if (action === SwapFormActions.FCM_SWAP || action === SwapFormActions.FCM_UNWIND) {
        if (!tokenApprovals.FCMApproved) {
          return SwapFormSubmitButtonStates.APPROVE_FCM;
        }
        if (!tokenApprovals.yieldBearingTokenApprovedForFCM) {
          return SwapFormSubmitButtonStates.APPROVE_YBT_FCM;
        }
        if (!tokenApprovals.underlyingTokenApprovedForFCM) {
          return SwapFormSubmitButtonStates.APPROVE_UT_FCM;
        }
      } 
      else {
        if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
          return SwapFormSubmitButtonStates.APPROVE_UT_PERIPHERY
        }
      }
    }
    
    if (mode === SwapFormModes.EDIT_MARGIN) {
      return SwapFormSubmitButtonStates.UPDATE;
    }
    if (agent === Agents.FIXED_TRADER) {
      return SwapFormSubmitButtonStates.TRADE_FIXED
    }
    return SwapFormSubmitButtonStates.TRADE_VARIABLE;
  };

  const updateLeverage = (newLeverage: SwapFormState['leverage']) => {
    if(!touched.current.includes('leverage')) {
      touched.current.push('leverage');
    }
    setLeverage(newLeverage);

    if(!isUndefined(notional)) {
      if(!touched.current.includes('margin')) {
        touched.current.push('margin');
      }
      setMargin(parseFloat((notional / newLeverage).toFixed(2)));
    }
  }

  const updateMargin = (newMargin: SwapFormState['margin']) => {
    if(!touched.current.includes('margin')) {
      touched.current.push('margin');
    }

    setMargin(newMargin);

    if(!isUndefined(newMargin) && !isUndefined(notional)) {
      setLeverage(parseFloat((notional / newMargin).toFixed(2)));
    }
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

  const updateRatesMoveBy = (value: number) => {
    if(!touched.current.includes('ratesMoveBy')) {
      touched.current.push('ratesMoveBy');
    }
    setRatesMoveBy(value);
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

    if((action === SwapFormActions.SWAP || action === SwapFormActions.UPDATE)) {
      if(isUndefined(margin)) {
        valid = false;
        addError(err, 'margin', 'Please enter an amount');
      }
    }

    // Check the user has enough balance
    if(action === SwapFormActions.SWAP || action === SwapFormActions.UPDATE) {
      if(margin !== 0 && await hasEnoughUnderlyingTokens(amm, margin) === false) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    }
    else {
      if(action === SwapFormActions.FCM_SWAP) {
        if(notional !== 0 && await hasEnoughTokens(amm, swapInfo.result?.fee, notional) === false) {
          valid = false;
          addError(err, 'notional', 'Insufficient funds');
        }
      } else {
        if(await hasEnoughUnderlyingTokens(amm, swapInfo.result?.fee) === false) {
          valid = false;
          addError(err, 'notional', 'Insufficient funds');
        }
      }
    }

    // Check that the input margin is >= minimum required margin
    if(action === SwapFormActions.SWAP || action === SwapFormActions.UPDATE) {
      if(lessThan(margin, swapInfo.result?.marginRequirement) === true) {
        valid = false;
        addError(err, 'margin', 'Not enough margin');
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
      addError(err, 'margin', 'Please enter an amount');
    }

    // check user has sufficient funds
    if(marginAction === SwapFormMarginAction.ADD) {
      if(margin !== 0 && await hasEnoughUnderlyingTokens(amm, margin) === false) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    }

    // Check that the input margin is >= minimum required margin if removing margin
    if(position && !isUndefined(minRequiredMargin) && marginAction === SwapFormMarginAction.REMOVE) {
      if(!isUndefined(margin) && margin !== 0) {
        const originalMargin = amm.descale(BigNumber.from(position.margin.toString()));
        const remainingMargin = originalMargin - margin;

        if(remainingMargin < minRequiredMargin) {
          valid = false;
          addError(err, 'margin', 'Withdrawl amount too high');
        }
      }
    }
    
    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  const value = {
    action,
    amm,
    approvalsNeeded,
    balance,
    errors,
    hintState: getHintState(),
    isAddingMargin,
    isFCMAction,
    isTradeVerified,
    isRemovingMargin,
    isValid,
    minRequiredMargin,
    mode,
    position,
    ratesMoveBy,
    setLeverage: updateLeverage,
    setMargin: updateMargin,
    setMarginAction: updateMarginAction,
    setNotional: updateNotional,
    setPartialCollateralization: updatePartialCollateralization,
    setRatesMoveBy: updateRatesMoveBy,
    swapInfo: {
      data: swapInfo.result || undefined,
      errorMessage: swapInfo.errorMessage || undefined,
      loading: swapInfo.loading
    },
    state: {
      leverage,
      margin,
      marginAction,
      notional,
      partialCollateralization
    },
    submitButtonState: getSubmitButtonState(),
    tokenApprovals,
    validate
  }

  return (
    <SwapFormCtx.Provider value={value}>
      {children}
    </SwapFormCtx.Provider>
  )
}

export const useSwapFormContext = () => useContext(SwapFormCtx);