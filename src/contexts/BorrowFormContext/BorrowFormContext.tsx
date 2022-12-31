import { InfoPostSwap } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useAgent } from '../../hooks/useAgent';
import { GetInfoType } from '../../hooks/useAMM/types';
import { UseAsyncFunctionResult } from '../../hooks/useAsyncFunction';
import { useBalance } from '../../hooks/useBalance';
import { useTokenApproval } from '../../hooks/useTokenApproval';
import { hasEnoughUnderlyingTokens, lessThanEpsilon } from '../../utilities/validation';
import { Agents } from '../AgentContext/types';
import { useAMMContext } from '../AMMContext/AMMContext';
import { useBorrowAMMContext } from '../BorrowAMMContext/BorrowAMMContext';
import { usePositionContext } from '../PositionContext/PositionContext';
import * as s from '../SwapFormContext/services';

export type BorrowFormProviderProps = {};

export enum BorrowFormSubmitButtonStates {
  APPROVE_UT_PERIPHERY = 'APPROVE_UT_PERIPHERY',
  APPROVING = 'APPROVING',
  CHECKING = 'CHECKING',
  INITIALISING = 'INITIALISING',
  FIX_RATE = 'FIX_RATE',
}

export enum BorrowFormSubmitButtonHintStates {
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
  READY_TO_TRADE = 'READY_TO_TRADE',
}

export type BorrowFormContext = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  selectedFixedDebt: number;
  selectedFixedDebtPercentage: number;
  selectedVariableDebt: number;
  selectedVariableDebtPercentage: number;
  margin: number;
  setNotional: (value: number) => void;
  errors: Record<string, string>;
  isValid: boolean;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  hintState: BorrowFormSubmitButtonHintStates;
  submitButtonState: BorrowFormSubmitButtonStates;
  approvalsNeeded: boolean;
  isTradeVerified: boolean;
  borrowInfo: {
    data?: InfoPostSwap;
    errorMessage?: string;
    loading: boolean;
  };
  balance: number;
  warningText?: string;
};

const borrowFormCtx = createContext<BorrowFormContext>({} as unknown as BorrowFormContext);
borrowFormCtx.displayName = 'BorrowFormContext';

export const BorrowFormProvider: React.FunctionComponent<BorrowFormProviderProps> = ({
  children,
}) => {
  const { amm } = useAMMContext();
  const { position } = usePositionContext();
  const { variableDebtInNativeTokens: variableDebt, borrowSwapInfo } = useBorrowAMMContext();
  const balance = useBalance(amm, undefined);

  const [selectedFixedDebt, setSelectedFixedDebt] =
    useState<BorrowFormContext['selectedFixedDebt']>(0);
  const [selectedFixedDebtPercentage, setSelectedFixedDebtPercentage] =
    useState<BorrowFormContext['selectedFixedDebtPercentage']>(0);
  const [selectedVariableDebt, setSelectedVariableDebt] =
    useState<BorrowFormContext['selectedVariableDebt']>(0);
  const [selectedVariableDebtPercentage, setSelectedVariableDebtPercentage] =
    useState<BorrowFormContext['selectedVariableDebtPercentage']>(0);
  const [margin, setMargin] = useState<number>(0);

  const isAvailableNotionalInsufficient = useRef<boolean>(false);
  const borrowSwapInfoAsyncState = useRef<number>(5);
  const validateId = useRef<number>(0);

  const isTradeInfoLoading = borrowSwapInfoAsyncState.current < 4;

  const tokenApprovals = useTokenApproval(amm, false, margin);
  const approvalsNeeded = s.approvalsNeeded(tokenApprovals, false);
  const isTradeVerified =
    !isTradeInfoLoading && !!borrowSwapInfo.result && !borrowSwapInfo.errorMessage;

  const { agent, onChangeAgent } = useAgent();
  useEffect(() => {
    variableDebt.call(position);
    onChangeAgent(Agents.VARIABLE_TRADER);
  }, []);
  useEffect(() => {
    onChangeAgent(Agents.VARIABLE_TRADER);
  }, [agent]);

  const [errors, setErrors] = useState<BorrowFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);
  const addError = (err: Record<string, string>, name: string, message: string) => {
    if (touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const [warningText, setWarningText] = useState<string | undefined>(undefined);

  const validate = async () => {
    validateId.current = (validateId.current + 1) % 666013;
    const currentValidateId = validateId.current;

    updateBorrowSwapInfoAsyncState();

    const err: Record<string, string> = {};
    let valid = true;
    let warnText: string | undefined = undefined;

    if (approvalsNeeded) {
      setErrors(err);
      setIsValid(valid);
      setWarningText(warnText);
      return;
    }

    if (borrowSwapInfoAsyncState.current === 5) {
      valid = false;
      addError(err, 'slider', 'Please select fixed debt amount');
    }

    if (
      borrowSwapInfoAsyncState.current === 4 &&
      borrowSwapInfo.result?.availableNotional !== undefined &&
      lessThanEpsilon(
        borrowSwapInfo.result?.availableNotional,
        selectedFixedDebt ?? 0,
        0.0000001,
      ) === true
    ) {
      updateNotional(
        Math.floor(
          ((borrowSwapInfo.result?.availableNotional / (variableDebt.result as number)) * 1000) /
            25,
        ) * 2.5,
      );
      isAvailableNotionalInsufficient.current = true;
      valid = false;
    }

    if (isAvailableNotionalInsufficient.current) {
      // valid = false;
      warnText =
        'There is not enough liquidity in the pool to fix all of your debt. The position the slider is in now is the maximum amount of variable debt you can fix.';
    }

    // Check the user has enough balance
    if (margin !== 0 && (await hasEnoughUnderlyingTokens(amm, margin, undefined)) === false) {
      valid = false;
      addError(err, 'margin', 'Insufficient funds');
    }

    if (currentValidateId === validateId.current) {
      setErrors(err);
      setIsValid(valid);
      setWarningText(warnText);
    }

    return valid;
  };

  const updateBorrowSwapInfoAsyncState = () => {
    if (borrowSwapInfoAsyncState.current === 5) {
      return;
    }

    if (
      borrowSwapInfo.loading === false &&
      borrowSwapInfo.result === null &&
      borrowSwapInfo.errorMessage === null
    ) {
      borrowSwapInfoAsyncState.current = 1;
    }

    if (
      borrowSwapInfo.loading === true &&
      borrowSwapInfo.result === null &&
      borrowSwapInfo.errorMessage === null
    ) {
      borrowSwapInfoAsyncState.current = 2;
    }

    if (
      borrowSwapInfo.loading === true &&
      borrowSwapInfo.result !== null &&
      borrowSwapInfo.errorMessage === null
    ) {
      borrowSwapInfoAsyncState.current = 3;
    }

    if (
      borrowSwapInfo.loading === true &&
      borrowSwapInfo.result === null &&
      borrowSwapInfo.errorMessage !== null
    ) {
      borrowSwapInfoAsyncState.current = 3;
    }

    if (
      borrowSwapInfo.loading === false &&
      borrowSwapInfo.result !== null &&
      borrowSwapInfo.errorMessage === null
    ) {
      borrowSwapInfoAsyncState.current = 4;
    }

    if (
      borrowSwapInfo.loading === false &&
      borrowSwapInfo.result === null &&
      borrowSwapInfo.errorMessage !== null
    ) {
      borrowSwapInfoAsyncState.current = 4;
    }
  };

  // 4
  // Validate the form after values change
  useEffect(() => {
    if (touched.current.length) {
      validate();
    }
  }, [borrowSwapInfo.loading, borrowSwapInfo.result, borrowSwapInfo.errorMessage, margin]);

  const getHintState = () => {
    // Please note that the order these are in is important, you need the conditions that take precidence
    // to be nearer the top.

    // Token approvals - Checking current status
    if (tokenApprovals.checkingApprovals) {
      return BorrowFormSubmitButtonHintStates.INITIALISING;
    }
    if (tokenApprovals.approving) {
      return BorrowFormSubmitButtonHintStates.APPROVING;
    }
    if (isTradeInfoLoading) {
      return BorrowFormSubmitButtonHintStates.CHECKING;
    }

    // Form validation
    if (!isValid) {
      if (errors.balance) {
        return BorrowFormSubmitButtonHintStates.FORM_INVALID_BALANCE;
      }
      if (!Object.keys(errors).length) {
        return BorrowFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE;
      }
      return BorrowFormSubmitButtonHintStates.FORM_INVALID;
    }

    if (tokenApprovals.lastError) {
      return BorrowFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL;
    }

    if (tokenApprovals.getNextApproval()) {
      if (tokenApprovals.lastApproval) {
        return BorrowFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN;
      } else {
        return BorrowFormSubmitButtonHintStates.APPROVE_TOKEN;
      }
    }

    // // trade info failed
    if (borrowSwapInfo.errorMessage) {
      return BorrowFormSubmitButtonHintStates.FORM_INVALID_TRADE;
    }

    if (tokenApprovals.lastApproval) {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE;
    }
  };

  const getSubmitButtonState = () => {
    if (tokenApprovals.checkingApprovals) {
      return BorrowFormSubmitButtonStates.INITIALISING;
    }
    if (tokenApprovals.approving) {
      return BorrowFormSubmitButtonStates.APPROVING;
    }
    if (isTradeInfoLoading) {
      return BorrowFormSubmitButtonStates.CHECKING;
    }

    if (!tokenApprovals.underlyingTokenApprovedForPeriphery) {
      return BorrowFormSubmitButtonStates.APPROVE_UT_PERIPHERY;
    }

    return BorrowFormSubmitButtonStates.FIX_RATE;
  };

  useEffect(() => {
    if (variableDebt.loading || variableDebt.result === null || variableDebt.result === undefined) {
      return;
    }

    setSelectedFixedDebt(0);
    setSelectedFixedDebtPercentage(0);
    setSelectedVariableDebt(variableDebt.result);
    setSelectedVariableDebtPercentage(100);
  }, [variableDebt.loading, variableDebt.result]);

  const updateNotional = (value: number) => {
    if (!touched.current.includes('margin')) {
      touched.current.push('margin');
    }

    if (!touched.current.includes('slider')) {
      touched.current.push('slider');
    }

    if (variableDebt.loading || variableDebt.result === null || variableDebt.result === undefined) {
      return;
    }

    isAvailableNotionalInsufficient.current = false;

    if (value === selectedFixedDebtPercentage) {
      return;
    }

    setSelectedFixedDebt((variableDebt.result * value) / 100);
    setSelectedFixedDebtPercentage(value);

    setSelectedVariableDebt((variableDebt.result * (100 - value)) / 100);
    setSelectedVariableDebtPercentage(100 - value);
  };

  // 1
  const selectedFixedDebtChanged = () => {
    if (isAvailableNotionalInsufficient.current === true) {
      return;
    }

    if (approvalsNeeded && touched.current.length) {
      validate();
    }

    if (!approvalsNeeded && !isUndefined(selectedFixedDebt)) {
      if (selectedFixedDebt === 0) {
        setMargin(0);
        borrowSwapInfoAsyncState.current = 5;
      } else {
        borrowSwapInfoAsyncState.current = 0;
        borrowSwapInfo.call({
          position,
          margin,
          notional: selectedFixedDebt,
          type: GetInfoType.NORMAL_SWAP,
        });
      }
    }
  };

  useEffect(() => {
    selectedFixedDebtChanged();
  }, [selectedFixedDebt]);

  useEffect(() => {
    if (!approvalsNeeded && touched.current.length) {
      selectedFixedDebtChanged();
      if (selectedFixedDebt === 0) {
        validate();
      }
    }
  }, [approvalsNeeded]);

  useEffect(() => {
    updateBorrowSwapInfoAsyncState();

    if (borrowSwapInfoAsyncState.current === 4 && borrowSwapInfo.result) {
      setMargin(
        Math.max(
          borrowSwapInfo.result.marginRequirement,
          borrowSwapInfo.result.borrowMarginRequirement,
        ),
      );
    }
  }, [borrowSwapInfo.loading, borrowSwapInfo.result, borrowSwapInfo.errorMessage]);

  const value = {
    variableDebt,
    selectedFixedDebt,
    selectedFixedDebtPercentage,
    selectedVariableDebt,
    selectedVariableDebtPercentage,
    margin,
    setNotional: updateNotional,
    errors,
    isValid,
    tokenApprovals,
    hintState: getHintState(),
    submitButtonState: getSubmitButtonState(),
    approvalsNeeded,
    isTradeVerified,
    borrowInfo: {
      data: borrowSwapInfoAsyncState.current === 4 ? borrowSwapInfo.result || undefined : undefined,
      errorMessage:
        borrowSwapInfoAsyncState.current === 4
          ? borrowSwapInfo.errorMessage || undefined
          : undefined,
      loading: isTradeInfoLoading,
    },
    balance: balance,
    warningText,
  };

  return <borrowFormCtx.Provider value={value}>{children}</borrowFormCtx.Provider>;
};

export const useBorrowFormContext = (): BorrowFormContext => {
  return useContext(borrowFormCtx);
};
