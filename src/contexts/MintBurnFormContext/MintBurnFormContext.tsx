import { useBalance, useTokenApproval } from '@hooks';
import { useAMMContext, usePositionContext } from '@contexts';
import { AugmentedAMM, hasEnoughUnderlyingTokens } from '@utilities';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';

export enum MintBurnFormModes {
  NEW_POSITION='NEW_POSITION',
  EDIT_MARGIN='EDIT_MARGIN',
  EDIT_LIQUIDITY='EDIT_LIQUIDITY',
  ROLLOVER='ROLLOVER',
}

export enum MintBurnFormActions {
  UPDATE='UPDATE',
  MINT='MINT',
  BURN='BURN'
};

export enum MintBurnFormLiquidityAction {
  ADD='add',
  BURN='burn'
};

export enum MintBurnFormMarginAction {
  ADD='add',
  REMOVE='remove'
};

export enum MintBurnFormHintStates {
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
}

export enum MintBurnFormSubmitButtonStates {
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  APPROVE_UT_PERIPHERY = 'APPROVE_UT_PERIPHERY',
  APPROVING = 'APPROVING',
  CHECKING = 'CHECKING',
  DEPOSIT_MARGIN = 'DEPOSIT_MARGIN',
  INITIALISING = 'INITIALISING',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  SETTLE_AND_LP = 'SETTLE_AND_LP',
  WITHDRAW_MARGIN = 'WITHDRAW_MARGIN',
};

export type MintBurnFormState = {
  fixedLow?: number;
  fixedHigh?: number;
  liquidityAction: MintBurnFormLiquidityAction;
  margin?: number;
  marginAction: MintBurnFormMarginAction;
  notional?: number;
};

export type MintBurnFormProviderProps = {
  mode: MintBurnFormModes;
  defaultValues?: Partial<MintBurnFormState>;
}

export type MintBurnFormContext = {
  action: MintBurnFormActions;
  approvalsNeeded: boolean;
  balance?: number;
  errors: Record<string, string>;
  hintState: MintBurnFormHintStates;
  isAddingLiquidity: boolean;
  isAddingMargin: boolean;
  isRemovingLiquidity: boolean;
  isRemovingMargin: boolean;
  isTradeVerified: boolean;
  isValid: boolean;
  minRequiredMargin: {
    errorMessage?: string;
    loading: boolean;
    result?: number;
  };
  mode: MintBurnFormModes;
  positionInfo?: {
    errorMessage?: string;
    loading: boolean;
    result?: PositionInfo;
  };
  setFixedHigh: (value: MintBurnFormState['fixedHigh']) => void;
  setFixedLow: (value: MintBurnFormState['fixedLow']) => void;
  setLiquidityAction: (value: MintBurnFormState['liquidityAction']) => void;
  setMargin: (value: MintBurnFormState['margin']) => void;
  setMarginAction: (value: MintBurnFormState['marginAction']) => void;
  setNotional: (value: MintBurnFormState['notional']) => void;
  state: MintBurnFormState;
  submitButtonState: MintBurnFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  totalBalance: number;
  validate: () => Promise<boolean>;
};

const MintBurnFormCtx = createContext<MintBurnFormContext>({} as unknown as MintBurnFormContext);

export const MintBurnFormProvider: React.FunctionComponent<MintBurnFormProviderProps> = ({ 
  children, 
  defaultValues = {}, 
  mode = MintBurnFormModes.NEW_POSITION,
}) => {
  const { amm: poolAmm, mintMinimumMarginRequirement } = useAMMContext();
  const { position, amm: positionAmm, positionInfo } = usePositionContext();

  const defaultFixedHigh = position?.fixedRateUpper.toNumber() ?? defaultValues.fixedHigh ?? undefined;
  const defaultFixedLow = position?.fixedRateLower.toNumber() ?? defaultValues.fixedLow ?? undefined;
  const defaultLiquidityAction = defaultValues.liquidityAction ?? MintBurnFormLiquidityAction.ADD;
  const defaultMargin = defaultValues.margin ?? undefined;
  const defaultMarginAction = defaultValues.marginAction ?? MintBurnFormMarginAction.ADD;
  const defaultNotional = (mode === MintBurnFormModes.ROLLOVER && position) 
    ? position.notional
    : defaultValues.notional ?? undefined;

  const balance = useBalance((position?.amm as AugmentedAMM) || poolAmm, mode === MintBurnFormModes.ROLLOVER ? position : undefined);
  const [fixedHigh, setFixedHigh] = useState<MintBurnFormState['fixedHigh']>(defaultFixedHigh);
  const [fixedLow, setFixedLow] = useState<MintBurnFormState['fixedLow']>(defaultFixedLow);
  const [liquidityAction, setLiquidityAction] = useState<MintBurnFormLiquidityAction>(defaultLiquidityAction);
  const [margin, setMargin] = useState<MintBurnFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const [notional, setNotional] = useState<MintBurnFormState['notional']>(defaultNotional);
  const tokenApprovals = useTokenApproval(poolAmm, true);
  
  const approvalsNeeded = !tokenApprovals.underlyingTokenApprovedForPeriphery;
  const [errors, setErrors] = useState<MintBurnFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const isTradeVerified = !isUndefined(mintMinimumMarginRequirement.result ?? undefined) && !mintMinimumMarginRequirement.loading && !mintMinimumMarginRequirement.errorMessage;
  const minimumRequiredMargin = mintMinimumMarginRequirement.result ?? undefined;
  const totalBalance = balance + (positionInfo?.result?.accruedCashflow ?? 0)
  const touched = useRef<string[]>([]);

  const isAddingLiquidity = mode !== MintBurnFormModes.EDIT_LIQUIDITY || liquidityAction === MintBurnFormLiquidityAction.ADD;
  const isAddingMargin = mode === MintBurnFormModes.EDIT_MARGIN && marginAction === MintBurnFormMarginAction.ADD;
  const isRemovingLiquidity = mode === MintBurnFormModes.EDIT_LIQUIDITY && liquidityAction === MintBurnFormLiquidityAction.BURN;
  const isRemovingMargin = mode === MintBurnFormModes.EDIT_MARGIN && marginAction === MintBurnFormMarginAction.REMOVE;

  let action: MintBurnFormActions;
  if (mode === MintBurnFormModes.EDIT_MARGIN) {
    action = MintBurnFormActions.UPDATE;
  } 
  else if (mode !== MintBurnFormModes.EDIT_LIQUIDITY || liquidityAction === MintBurnFormLiquidityAction.ADD) {
    action = MintBurnFormActions.MINT;
  } 
  else {
    action = MintBurnFormActions.BURN;
  }

  const getHintState = () => {
    // Please note that the order these are in is important, you need the conditions that take precidence
    // to be nearer the top.

    if(tokenApprovals.checkingApprovals) {
      return MintBurnFormHintStates.INITIALISING;
    }
    if(tokenApprovals.approving) {
      return MintBurnFormHintStates.APPROVING;
    }
    if (mintMinimumMarginRequirement.loading) {
      return MintBurnFormHintStates.CHECKING;
    }
  
    // Form validation
    if (!isValid) {
      if(errors.balance) {
        return MintBurnFormHintStates.FORM_INVALID_BALANCE;
      }
      if(!Object.keys(errors).length) {
        return MintBurnFormHintStates.FORM_INVALID_INCOMPLETE;
      }
      return MintBurnFormHintStates.FORM_INVALID;
    }
  
    if(!isRemovingLiquidity && !isRemovingMargin) {
      if(tokenApprovals.lastError) {
        return MintBurnFormHintStates.ERROR_TOKEN_APPROVAL;
      }
      
      if(tokenApprovals.getNextApproval(false)) {
        if(tokenApprovals.lastApproval) {
          return MintBurnFormHintStates.APPROVE_NEXT_TOKEN;
        } else {
          return MintBurnFormHintStates.APPROVE_TOKEN;
        }
      }
    }
  
    // trade info failed
    if (mintMinimumMarginRequirement.errorMessage) {
      return MintBurnFormHintStates.FORM_INVALID_TRADE;
    }
  
    if(tokenApprovals.lastApproval) {
      return MintBurnFormHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      return MintBurnFormHintStates.READY_TO_TRADE;
    }
  }

  const getSubmitButtonState = () => {
    if (tokenApprovals.checkingApprovals) {
      return MintBurnFormSubmitButtonStates.INITIALISING;
    }
    if (tokenApprovals.approving) {
      return MintBurnFormSubmitButtonStates.APPROVING;
    }
    if (mintMinimumMarginRequirement.loading) {
      return MintBurnFormSubmitButtonStates.CHECKING;
    }
  
    if(!isRemovingMargin && !isRemovingLiquidity) {
      if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        return MintBurnFormSubmitButtonStates.APPROVE_UT_PERIPHERY;
      }
    }

    if(mode === MintBurnFormModes.ROLLOVER) {
      return MintBurnFormSubmitButtonStates.SETTLE_AND_LP; 
    }
  
    if(mode === MintBurnFormModes.EDIT_MARGIN) {
      return isAddingMargin 
        ? MintBurnFormSubmitButtonStates.DEPOSIT_MARGIN 
        : MintBurnFormSubmitButtonStates.WITHDRAW_MARGIN;
    }

    return isAddingLiquidity 
      ? MintBurnFormSubmitButtonStates.ADD_LIQUIDITY 
      : MintBurnFormSubmitButtonStates.REMOVE_LIQUIDITY;
  };

  // Load the mint summary info
  useEffect(() => {
    if (
      !isUndefined(notional) && notional !== 0 &&
      !isUndefined(fixedLow) && fixedLow !== 0 &&
      !isUndefined(fixedHigh) && fixedHigh !== 0
    ) {
      mintMinimumMarginRequirement.call({ 
        fixedLow: fixedLow, 
        fixedHigh: fixedHigh, 
        notional: notional 
      });
    }
  }, [mintMinimumMarginRequirement.call, notional, fixedLow, fixedHigh]);

  // Load the position info (if we have a current position)
  useEffect(() => {
    if(position) positionInfo?.call(position);
  }, [position]);

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

  const validate = async () => {
    if(mode === MintBurnFormModes.NEW_POSITION || mode === MintBurnFormModes.ROLLOVER) {
      return await validateNewPosition();
    } else if(mode === MintBurnFormModes.EDIT_MARGIN) {
      return await validateEditMargin();
    } else {
      return await validateEditLiquidity();
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

    if(isUndefined(margin)) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }

    if(!isUndefined(margin)) {
      try {
        const hasEnoughFunds = await hasEnoughUnderlyingTokens(
          positionAmm || poolAmm,
          margin,
          mode === MintBurnFormModes.ROLLOVER ? position : undefined
        );
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

    // Check that the input margin is >= minimum required margin
    if(!isUndefined(minimumRequiredMargin) && !isUndefined(margin) && margin < minimumRequiredMargin) {
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
          const hasEnoughFunds = await hasEnoughUnderlyingTokens(
            positionAmm || poolAmm, 
            margin, 
            mode === MintBurnFormModes.ROLLOVER ? position : undefined
          );
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

    if(liquidityAction === MintBurnFormLiquidityAction.ADD && (isUndefined(margin) || margin === 0)) {
      valid = false;
      if(touched.current.includes('margin')) {
        err['margin'] = 'Please enter an amount';
      }
    }

    if(liquidityAction === MintBurnFormLiquidityAction.ADD) {
      // check user has sufficient funds
      if(!isUndefined(margin)) {
        try {
          const hasEnoughFunds = await hasEnoughUnderlyingTokens(
            positionAmm || poolAmm, 
            margin, 
            mode === MintBurnFormModes.ROLLOVER ? position : undefined
          );
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
    setIsValid(valid);
    return valid;
  };

  const value = {
    action,
    approvalsNeeded,
    balance,
    errors,
    hintState: getHintState(),
    isAddingLiquidity,
    isAddingMargin,
    isRemovingLiquidity,
    isRemovingMargin,
    isTradeVerified,
    isValid,
    minRequiredMargin: {
      errorMessage: mintMinimumMarginRequirement.errorMessage || undefined,
      loading: mintMinimumMarginRequirement.loading,
      result: mintMinimumMarginRequirement.result ?? undefined
    },
    mode,
    positionInfo: positionInfo ? {
      loading: positionInfo.loading,
      errorMessage: positionInfo.errorMessage ?? undefined,
      result: positionInfo.result ?? undefined
    } : undefined,
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
    submitButtonState: getSubmitButtonState(),
    tokenApprovals,
    totalBalance,
    validate
  }

  return (
    <MintBurnFormCtx.Provider value={value}>
      {children}
    </MintBurnFormCtx.Provider>
  )
}

export const useMintBurnForm = () => useContext(MintBurnFormCtx);