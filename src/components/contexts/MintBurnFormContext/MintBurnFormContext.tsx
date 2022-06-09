import { useAgent, useAMMContext, useBalance, useTokenApproval } from '@hooks';
import { AugmentedAMM } from '@utilities';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { BigNumber } from 'ethers';
import { Position } from '@voltz-protocol/v1-sdk';
import { Box } from '@mui/material';
import { colors } from "@theme";

export enum MintBurnFormModes {
  NEW_POSITION='NEW_POSITION',
  EDIT_MARGIN='EDIT_MARGIN',
  EDIT_LIQUIDITY='EDIT_LIQUIDITY'
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
  amm: AugmentedAMM;
  mode: MintBurnFormModes;
  position?: Position;
  defaultValues?: Partial<MintBurnFormState>;
}

export type MintBurnFormContext = {
  action: MintBurnFormActions;
  amm: AugmentedAMM;
  approvalsNeeded: boolean;
  balance?: BigNumber;
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
  setFixedHigh: (value: MintBurnFormState['fixedHigh']) => void;
  setFixedLow: (value: MintBurnFormState['fixedLow']) => void;
  setLiquidityAction: (value: MintBurnFormState['liquidityAction']) => void;
  setMargin: (value: MintBurnFormState['margin']) => void;
  setMarginAction: (value: MintBurnFormState['marginAction']) => void;
  setNotional: (value: MintBurnFormState['notional']) => void;
  state: MintBurnFormState;
  submitButtonState: MintBurnFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  validate: () => Promise<boolean>;
};

const MintBurnFormCtx = createContext<MintBurnFormContext>({} as unknown as MintBurnFormContext);

type TextProps = {
  bold?: boolean;
  children?: ReactNode;
  green?: boolean;
  red?: boolean;
};
const Text = ({ bold, children, green, red }: TextProps) => (
  <Box component='span' sx={{ 
    color: green ? colors.vzCustomGreen1 : red ? colors.vzCustomRed1 : undefined,
    fontWeight: bold ? 'bold' : undefined,
    textTransform: 'none'
  }}>
    {children}
  </Box>
);

export const MintBurnFormProvider: React.FunctionComponent<MintBurnFormProviderProps> = ({ 
  amm, 
  children, 
  defaultValues = {}, 
  mode = MintBurnFormModes.NEW_POSITION,
  position
}) => {
  const defaultFixedHigh = position?.fixedRateUpper.toNumber() ?? defaultValues.fixedHigh ?? undefined;
  const defaultFixedLow = position?.fixedRateLower.toNumber() ?? defaultValues.fixedLow ?? undefined;
  const defaultLiquidityAction = defaultValues.liquidityAction ?? MintBurnFormLiquidityAction.ADD;
  const defaultMargin = defaultValues.margin ?? 0;
  const defaultMarginAction = defaultValues.marginAction ?? MintBurnFormMarginAction.ADD;
  const defaultNotional = defaultValues.notional ?? 0;

  const { agent } = useAgent();
  const balance = useBalance(amm);
  const [fixedHigh, setFixedHigh] = useState<MintBurnFormState['fixedHigh']>(defaultFixedHigh);
  const [fixedLow, setFixedLow] = useState<MintBurnFormState['fixedLow']>(defaultFixedLow);
  const [liquidityAction, setLiquidityAction] = useState<MintBurnFormLiquidityAction>(defaultLiquidityAction);
  const [margin, setMargin] = useState<MintBurnFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<MintBurnFormMarginAction>(defaultMarginAction);
  const { mintMinimumMarginRequirement } = useAMMContext();
  const [notional, setNotional] = useState<MintBurnFormState['notional']>(defaultNotional);
  const tokenApprovals = useTokenApproval(amm, true);
  
  const approvalsNeeded = !tokenApprovals.underlyingTokenApprovedForPeriphery;
  const [errors, setErrors] = useState<MintBurnFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const isTradeVerified = !!mintMinimumMarginRequirement.result && !mintMinimumMarginRequirement.loading && !mintMinimumMarginRequirement.errorMessage;
  const minimumRequiredMargin = mintMinimumMarginRequirement.result ?? undefined;
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
  
    if(!!isRemovingLiquidity && !isRemovingMargin) {
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
    if(mode === MintBurnFormModes.NEW_POSITION) {
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
      if(!isUndefined(margin)) {
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
    validate
  }

  return (
    <MintBurnFormCtx.Provider value={value}>
      {children}
    </MintBurnFormCtx.Provider>
  )
}

export const useMintBurnForm = () => useContext(MintBurnFormCtx);