import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';
import * as s from './services';
import { BigNumber } from 'ethers';

import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import { SwapFormActions, SwapFormModes } from '../../components/interface/SwapForm';
import { GetInfoType } from '../../hooks/useAMM/types';
import { useWallet } from '../../hooks/useWallet';
import { useBalance } from '../../hooks/useBalance';
import { useCurrentPositionMarginRequirement } from '../../hooks/useCurrentPositionMarginRequirement';
import { usePositionContext } from '../PositionContext/PositionContext';
import { Agents } from '../AgentContext/types';
import { useAMMContext } from '../AMMContext/AMMContext';
import { useTokenApproval } from '../../hooks/useTokenApproval';
import { useAgent } from '../../hooks/useAgent';
import { DataLayerEventPayload, pushEvent } from '../../utilities/googleAnalytics';
import { hasEnoughUnderlyingTokens, lessThan, lessThanEpsilon } from '../../utilities/validation';
import { formatNumber, stringToBigFloat } from '../../utilities/number';
import { getAmmProtocol } from '../../utilities/amm';
import { isMarginWithdrawable } from '../../utilities/isMarginWithdrawable';
import {
  SwapFormMarginAction,
  SwapFormSubmitButtonHintStates,
  SwapFormSubmitButtonStates,
} from './enums';

// updateLeverage instead of setLeverage when notional updates
// have reset flag in onChange in Leverage to be able to reset leverage when box is modified.

export type SwapFormState = {
  leverage: number;
  margin?: number;
  marginAction: SwapFormMarginAction;
  notional?: number;
  resetDeltaState: boolean;
};

export type SwapFormProviderProps = {
  mode?: SwapFormModes;
  defaultValues?: Partial<SwapFormState>;
};

export type SwapFormContext = {
  action: SwapFormActions;
  approvalsNeeded: boolean;
  balance?: number;
  currentPositionMarginRequirement?: number;
  errors: Record<string, string>;
  hintState: SwapFormSubmitButtonHintStates;
  isAddingMargin: boolean;
  isRemovingMargin: boolean;
  isTradeVerified: boolean;
  isValid: boolean;
  mode: SwapFormModes;
  setLeverage: (value: SwapFormState['leverage'], resetToDefaultLeverage?: boolean) => void;
  setMargin: (value: SwapFormState['margin']) => void;
  setMarginAction: (value: SwapFormState['marginAction']) => void;
  setNotional: (value: SwapFormState['notional']) => void;
  state: SwapFormState;
  swapInfo: {
    data?: InfoPostSwap;
    errorMessage?: string;
    loading: boolean;
    maxAvailableNotional?: number;
  };
  submitButtonState: SwapFormSubmitButtonStates;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  validate: () => Promise<boolean>;
  warningText?: string;
  expectedApy?: number;
  expectedCashflow?: number;
  userSimulatedVariableApy?: number;
  setUserSimulatedVariableApy: (value: number, resetToDefault?: boolean) => void;
  userSimulatedVariableApyUpdated: boolean;
};

const SwapFormCtx = createContext<SwapFormContext>({} as unknown as SwapFormContext);
SwapFormCtx.displayName = 'SwapFormContext';

export const SwapFormProvider: React.FunctionComponent<SwapFormProviderProps> = ({
  children,
  defaultValues = {},
  mode = SwapFormModes.NEW_POSITION,
}) => {
  const { amm: poolAmm } = useAMMContext();
  const { amm: positionAmm, position } = usePositionContext();
  const { account } = useWallet();

  const defaultLeverage = defaultValues.leverage ?? 100;
  const defaultMargin = defaultValues.margin ?? undefined;
  const defaultMarginAction = defaultValues.marginAction || SwapFormMarginAction.ADD;
  const defaultNotional =
    mode === SwapFormModes.ROLLOVER && position
      ? Math.abs(position.effectiveVariableTokenBalance)
      : defaultValues.notional;

  const ammCtx = useAMMContext();
  const { agent, onChangeAgent } = useAgent();
  const balance = useBalance(
    positionAmm || poolAmm,
    mode === SwapFormModes.ROLLOVER ? position : undefined,
  );
  const [leverage, setLeverage] = useState<SwapFormState['leverage']>(defaultLeverage);
  const [margin, setMargin] = useState<SwapFormState['margin']>(defaultMargin);
  const [marginAction, setMarginAction] = useState<SwapFormMarginAction>(defaultMarginAction);
  const currentPositionMarginRequirement = useCurrentPositionMarginRequirement(poolAmm, 1, 999);
  const [notional, setNotional] = useState<SwapFormState['notional']>(defaultNotional);
  const { swapInfo, expectedApyInfo } = useAMMContext();
  const cachedSwapInfoMinRequiredMargin = useRef<number>();
  const [cachedSwapInfoAvailableNotional, setCachedSwapInfoAvailableNotional] = useState<number>();
  const tokenApprovals = useTokenApproval(poolAmm);
  const [userSimulatedVariableApy, setUserSimulatedVariableApy] = useState<number | undefined>(
    undefined,
  );

  const [errors, setErrors] = useState<SwapFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);

  const action = s.getFormAction(mode);
  const isAddingMargin =
    (mode === SwapFormModes.EDIT_MARGIN || mode === SwapFormModes.EDIT_NOTIONAL) &&
    marginAction === SwapFormMarginAction.ADD;
  const isRemovingMargin =
    (mode === SwapFormModes.EDIT_MARGIN || mode === SwapFormModes.EDIT_NOTIONAL) &&
    marginAction === SwapFormMarginAction.REMOVE;
  const isTradeVerified = !!swapInfo.result && !swapInfo.loading && !swapInfo.errorMessage;

  const approvalsNeeded = s.approvalsNeeded(tokenApprovals, isRemovingMargin);

  const [resetDeltaState, setResetDeltaState] = useState<boolean>(false);
  const [userSimulatedVariableApyUpdated, setUserSimulatedVariableApyUpdated] =
    useState<boolean>(false);

  const asyncCallsLoading = useRef<string[]>([]);

  // Set the correct agent type for the given position
  useEffect(() => {
    if (position) {
      onChangeAgent(position.positionType === 1 ? Agents.FIXED_TRADER : Agents.VARIABLE_TRADER);
    }
  }, [position]);

  // Load the fixed APR
  useEffect(() => {
    ammCtx.variableApy.call();
  }, []);

  useEffect(() => {
    if (userSimulatedVariableApyUpdated) {
      setUserSimulatedVariableApyUpdated(false);
    }
  }, [userSimulatedVariableApyUpdated]);

  useEffect(() => {
    if (isUndefined(userSimulatedVariableApy)) {
      if (ammCtx.variableApy.result) {
        updateUserSimulatedVariableApy(ammCtx.variableApy.result * 100);
      } else {
        setUserSimulatedVariableApy(undefined);
        setUserSimulatedVariableApyUpdated(true);
      }
    }
  }, [ammCtx.variableApy.result, userSimulatedVariableApy]);

  useEffect(() => {
    asyncCallsLoading.current = [];
    // swapInfo.call({
    //   position: undefined,
    //   margin: 1000000000000000,
    //   notional: 1000000000000000,  //10^15
    //   type: GetInfoType.NORMAL_SWAP
    // });
  }, [agent]);

  // cache the margin requirement from swapInfo
  // cache the available notional from swapInfo
  useEffect(() => {
    if (swapInfo.result) {
      cachedSwapInfoMinRequiredMargin.current = swapInfo.result.marginRequirement;
      setCachedSwapInfoAvailableNotional(swapInfo.result.availableNotional);
    }
  }, [swapInfo.result]);

  // Load the swap summary info
  useEffect(() => {
    if (!approvalsNeeded && !isUndefined(notional) && notional !== 0) {
      switch (action) {
        case SwapFormActions.SWAP: {
          asyncCallsLoading.current = [];
          swapInfo.call({
            position,
            margin,
            notional,
            type: GetInfoType.NORMAL_SWAP,
          });
          break;
        }
        case SwapFormActions.ROLLOVER_SWAP: {
          asyncCallsLoading.current = [];
          swapInfo.call({
            margin,
            notional,
            type: GetInfoType.NORMAL_SWAP,
          });
          break;
        }
      }
    }
  }, [swapInfo.call, notional, agent, approvalsNeeded, marginAction, ammCtx.variableApy.result]);

  useEffect(() => {
    if (
      !approvalsNeeded &&
      !isUndefined(notional) &&
      notional !== 0 &&
      !isUndefined(margin) &&
      swapInfo.result?.fixedTokenDeltaUnbalanced !== undefined &&
      swapInfo.result?.availableNotional !== undefined &&
      userSimulatedVariableApy !== undefined
    ) {
      expectedApyInfo.call({
        margin: margin,
        position: position,
        fixedTokenDeltaUnbalanced: swapInfo.result?.fixedTokenDeltaUnbalanced,
        availableNotional: swapInfo.result?.variableTokenDeltaBalance,
        predictedVariableApy: userSimulatedVariableApy,
      });
    }
  }, [
    agent,
    margin,
    swapInfo.result?.fixedTokenDeltaUnbalanced,
    swapInfo.result?.availableNotional,
    userSimulatedVariableApy,
  ]);

  // set the leverage back to 50% if variables change
  useEffect(() => {
    const minMargin = cachedSwapInfoMinRequiredMargin.current;
    if (
      isNumber(notional) &&
      isNumber(minMargin) &&
      cachedSwapInfoAvailableNotional !== undefined
    ) {
      const cappedMinMargin = Math.max(minMargin, 0.0001);
      const newLeverage = stringToBigFloat(
        formatNumber(
          Math.min(notional, cachedSwapInfoAvailableNotional) / cappedMinMargin / 2,
          0,
          2,
        ),
      );
      updateLeverage(newLeverage);
    }
  }, [resetDeltaState]);

  useEffect(() => {
    const minMargin = cachedSwapInfoMinRequiredMargin.current;
    if (
      isNumber(notional) &&
      isNumber(minMargin) &&
      cachedSwapInfoAvailableNotional !== undefined
    ) {
      const cappedMinMargin = Math.max(minMargin, 0.0001);
      const newLeverage = stringToBigFloat(
        formatNumber(
          Math.min(notional, cachedSwapInfoAvailableNotional) / cappedMinMargin / 2,
          0,
          2,
        ),
      );
      updateLeverage(newLeverage, false, false);
    }
  }, [notional, cachedSwapInfoAvailableNotional]);

  // Validate the form after values change
  useEffect(() => {
    if (touched.current.length) {
      void validate();
    }
  }, [
    margin,
    marginAction,
    notional,
    swapInfo.result?.marginRequirement,
    swapInfo.result?.fee,
    isValid,
  ]);

  const addError = (err: Record<string, string>, name: string, message: string) => {
    if (touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const getHintState = () => {
    // Please note that the order these are in is important, you need the conditions that take precidence
    // to be nearer the top.

    // Token approvals - Checking current status
    if (tokenApprovals.checkingApprovals) {
      return SwapFormSubmitButtonHintStates.INITIALISING;
    }
    if (tokenApprovals.approving) {
      return SwapFormSubmitButtonHintStates.APPROVING;
    }
    if (swapInfo.loading) {
      return SwapFormSubmitButtonHintStates.CHECKING;
    }

    // Form validation
    if (!isValid) {
      if (errors.balance) {
        return SwapFormSubmitButtonHintStates.FORM_INVALID_BALANCE;
      }
      if (!Object.keys(errors).length) {
        return SwapFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE;
      }
      return SwapFormSubmitButtonHintStates.FORM_INVALID;
    }

    if (!isRemovingMargin) {
      if (tokenApprovals.lastError) {
        return SwapFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL;
      }

      if (tokenApprovals.getNextApproval()) {
        if (tokenApprovals.lastApproval) {
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

    if (tokenApprovals.lastApproval) {
      return SwapFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      if (mode === SwapFormModes.EDIT_NOTIONAL || mode === SwapFormModes.EDIT_MARGIN) {
        const isRemovingNotional =
          (agent === Agents.VARIABLE_TRADER &&
            (position?.effectiveVariableTokenBalance ?? 0) < 0) ||
          (agent === Agents.FIXED_TRADER && (position?.effectiveVariableTokenBalance ?? 0) > 0);
        if (isRemovingNotional && isRemovingMargin) {
          return SwapFormSubmitButtonHintStates.REMOVE_AND_REMOVE;
        }
        if (isRemovingNotional && !isRemovingMargin) {
          return SwapFormSubmitButtonHintStates.REMOVE_AND_ADD;
        }
        if (!isRemovingNotional && isRemovingMargin) {
          return SwapFormSubmitButtonHintStates.ADD_AND_REMOVE;
        }
        if (!isRemovingNotional && !isRemovingMargin) {
          return SwapFormSubmitButtonHintStates.ADD_AND_ADD;
        }
      }
      return SwapFormSubmitButtonHintStates.READY_TO_TRADE;
    }
  };

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

    if (!isRemovingMargin) {
      if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        return SwapFormSubmitButtonStates.APPROVE_UT_PERIPHERY;
      }
    }

    if (mode === SwapFormModes.ROLLOVER) {
      return SwapFormSubmitButtonStates.ROLLOVER_TRADE;
    }

    if (mode === SwapFormModes.EDIT_NOTIONAL || mode === SwapFormModes.EDIT_MARGIN) {
      return SwapFormSubmitButtonStates.UPDATE_POSITION;
    }
    if (agent === Agents.FIXED_TRADER) {
      return SwapFormSubmitButtonStates.TRADE_FIXED;
    }
    return SwapFormSubmitButtonStates.TRADE_VARIABLE;
  };

  const updateLeverage = (
    newLeverage: SwapFormState['leverage'],
    resetToDefaultLeverage: boolean = false,
    updateMargin: boolean = true,
  ) => {
    if (!touched.current.includes('leverage')) {
      touched.current.push('leverage');
    }

    if (resetToDefaultLeverage) {
      if (!isUndefined(notional)) {
        setResetDeltaState(!resetDeltaState);
      }
    } else {
      setLeverage(newLeverage);

      if (
        updateMargin &&
        !isUndefined(notional) &&
        swapInfo.result?.availableNotional !== undefined
      ) {
        if (!touched.current.includes('margin')) {
          touched.current.push('margin');
        }
        const minNotional = Math.min(notional, swapInfo.result?.availableNotional);
        const formatted = formatNumber(minNotional / newLeverage, 0, 4);
        const newMargin = stringToBigFloat(formatted);
        setMargin(newMargin);
      }
    }
  };

  const updateUserSimulatedVariableApy = (
    newUserSimulatedVariableApy: number,
    resetToDefault: boolean = false,
  ) => {
    if (resetToDefault) {
      setUserSimulatedVariableApy(undefined);
    } else {
      if (newUserSimulatedVariableApy < 0) {
        newUserSimulatedVariableApy = 0;
      } else if (newUserSimulatedVariableApy > 1000) {
        newUserSimulatedVariableApy = 1000;
      }

      setUserSimulatedVariableApy(newUserSimulatedVariableApy / 100);
    }
    setUserSimulatedVariableApyUpdated(true);
  };

  const updateMargin = (newMargin: SwapFormState['margin']) => {
    if (!touched.current.includes('margin')) {
      touched.current.push('margin');
    }

    setMargin(newMargin);

    if (
      !isUndefined(newMargin) &&
      !isUndefined(notional) &&
      swapInfo.result?.availableNotional !== undefined
    ) {
      const minNotional = Math.min(notional, swapInfo.result?.availableNotional);
      const formatted = formatNumber(minNotional / newMargin, 0, 4);
      const newLeverage = stringToBigFloat(formatted);
      setLeverage(newLeverage);
    }
  };

  const updateMarginAction = (value: SwapFormState['marginAction']) => {
    if (!touched.current.includes('marginAction')) {
      touched.current.push('marginAction');
    }
    setMarginAction(value);
  };

  const updateNotional = (value: SwapFormState['notional']) => {
    if (!touched.current.includes('notional')) {
      touched.current.push('notional');
    }
    setNotional(value);
  };

  const validate = async () => {
    if (mode === SwapFormModes.NEW_POSITION || mode === SwapFormModes.ROLLOVER) {
      return await validateNewPosition();
    }

    return await validateEditNotionalOrMargin();
  };

  const validateNewPosition = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if (isUndefined(notional) || notional === 0) {
      valid = false;
      addError(err, 'notional', 'Please enter an amount');
    }

    // Check the user has enough balance
    if (
      action === SwapFormActions.SWAP ||
      action === SwapFormActions.UPDATE ||
      action === SwapFormActions.ROLLOVER_SWAP
    ) {
      if (
        margin !== 0 &&
        (await hasEnoughUnderlyingTokens(
          positionAmm || poolAmm,
          margin,
          mode === SwapFormModes.ROLLOVER ? position : undefined,
        )) === false
      ) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    } else {
      if (
        (await hasEnoughUnderlyingTokens(
          positionAmm || poolAmm,
          swapInfo.result?.fee,
          mode === SwapFormModes.ROLLOVER ? position : undefined,
        )) === false
      ) {
        valid = false;
        addError(err, 'notional', 'Insufficient funds');
      }
    }

    // Check that the input margin is >= minimum required margin
    if (
      action === SwapFormActions.SWAP ||
      action === SwapFormActions.UPDATE ||
      action === SwapFormActions.ROLLOVER_SWAP
    ) {
      if (isUndefined(margin) || lessThan(margin, swapInfo.result?.marginRequirement) === true) {
        valid = false;
        addError(err, 'margin', 'Not enough margin');
      }
    }

    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  const getWarningText = () => {
    let warnText = undefined;
    if (
      asyncCallsLoading.current.includes('swapInfo') &&
      !swapInfo.loading &&
      lessThanEpsilon(swapInfo.result?.availableNotional, notional, 0.00001) === true
    ) {
      warnText =
        'There is not enough liquidity in the pool to support your entire trade, meaning only a proportion of your trade will go through. You can see the details of this in the Trade Information box below.';
    }

    return warnText;
  };

  const validateEditNotionalOrMargin = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    // MARGIN
    if (isUndefined(margin) || margin === 0) {
      valid = false;
      addError(err, 'margin', 'Please enter an amount');
    }

    // check user has sufficient funds
    if (marginAction === SwapFormMarginAction.ADD) {
      if (
        margin !== 0 &&
        (await hasEnoughUnderlyingTokens(positionAmm || poolAmm, margin)) === false
      ) {
        valid = false;
        addError(err, 'margin', 'Insufficient funds');
      }
    }

    // Action: Remove Margin
    // Check enough margin is left in the position
    if (marginAction === SwapFormMarginAction.REMOVE) {
      const isWithdrawable = isMarginWithdrawable(
        margin,
        positionAmm?.descale(BigNumber.from(position?.margin.toString())),
        currentPositionMarginRequirement,
      );
      if (!isUndefined(isWithdrawable) && !isWithdrawable) {
        valid = false;
        addError(err, 'margin', 'Withdrawal amount too high');
      }
    }

    // NOTIONAL
    if (isUndefined(notional) || notional < 0) {
      valid = false;
      addError(err, 'notional', 'Please enter an amount');
    }

    // Check if notional/margin exceeds position balance
    if (position && swapInfo.result) {
      const isVT = position.effectiveVariableTokenBalance > 0;
      if (!isVT && agent === Agents.VARIABLE_TRADER) {
        const newVariableTokenBalance =
          position.effectiveVariableTokenBalance + (notional ? notional : 0);
        if (newVariableTokenBalance > 0) {
          valid = false;
          addError(err, 'notional', 'Removed too much notional');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (isVT && agent === Agents.FIXED_TRADER) {
        const newVariableTokenBalance =
          position.effectiveVariableTokenBalance - (notional ? notional : 0);
        if (newVariableTokenBalance < 0) {
          valid = false;
          addError(err, 'notional', 'Removed too much notional');
        }
      }
    }

    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  useEffect(() => {
    if (swapInfo.loading) {
      if (!asyncCallsLoading.current.includes('swapInfo')) {
        asyncCallsLoading.current.push('swapInfo');
      }
      return;
    }

    if (isUndefined(swapInfo.result) || !asyncCallsLoading.current.includes('swapInfo')) {
      return;
    }

    const payload: DataLayerEventPayload = {
      event: 'notional_change',
      eventValue: notional ?? 0,
      pool: getAmmProtocol(poolAmm),
      agent: agent,
    };
    pushEvent(account ?? '', payload);
  }, [swapInfo.loading, swapInfo.result]);

  const leverageChange = useCallback(
    debounce((value: number | undefined, _agent: Agents) => {
      const payload: DataLayerEventPayload = {
        event: 'leverage_change',
        eventValue: value ?? 0,
        pool: getAmmProtocol(poolAmm),
        agent: _agent,
      };
      pushEvent(account ?? '', payload);
    }, 1000),
    [],
  );

  const marginChange = useCallback(
    debounce((value: number | undefined, _agent: Agents) => {
      const payload: DataLayerEventPayload = {
        event: 'margin_change',
        eventValue: value ?? 0,
        pool: getAmmProtocol(poolAmm),
        agent: _agent,
      };
      pushEvent(account ?? '', payload);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (!isUndefined(margin)) {
      marginChange(margin, agent);
      leverageChange((notional ?? 0) / margin, agent);
    }
  }, [margin]);

  const value = {
    action,
    approvalsNeeded,
    balance,
    errors,
    hintState: getHintState(),
    isAddingMargin,
    isTradeVerified,
    isRemovingMargin,
    isValid,
    currentPositionMarginRequirement,
    mode,
    setLeverage: updateLeverage,
    setMargin: updateMargin,
    setMarginAction: updateMarginAction,
    setNotional: updateNotional,
    swapInfo: {
      data: swapInfo.result || undefined,
      errorMessage: swapInfo.errorMessage || undefined,
      loading: swapInfo.loading,
      maxAvailableNotional:
        swapInfo.result?.maxAvailableNotional ?? swapInfo.result?.availableNotional,
    },
    state: {
      leverage,
      margin,
      marginAction,
      notional,
      resetDeltaState,
    },
    submitButtonState: getSubmitButtonState(),
    tokenApprovals,
    validate,
    warningText: getWarningText(),
    expectedApy:
      !isUndefined(notional) && !isUndefined(margin) && !expectedApyInfo.loading
        ? expectedApyInfo.result?.expectedApy
        : undefined,
    expectedCashflow:
      !isUndefined(notional) && !isUndefined(margin) && !expectedApyInfo.loading
        ? expectedApyInfo.result?.expectedCashflow
        : undefined,
    userSimulatedVariableApy: !isUndefined(userSimulatedVariableApy)
      ? userSimulatedVariableApy * 100
      : undefined,
    setUserSimulatedVariableApy: updateUserSimulatedVariableApy,
    userSimulatedVariableApyUpdated: userSimulatedVariableApyUpdated,
  };

  return <SwapFormCtx.Provider value={value}>{children}</SwapFormCtx.Provider>;
};

export const useSwapFormContext = () => useContext(SwapFormCtx);
