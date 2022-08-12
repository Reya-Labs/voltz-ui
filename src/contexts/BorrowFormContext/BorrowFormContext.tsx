import { GetInfoType, useAMM, UseAsyncFunctionResult, useTokenApproval } from '@hooks';
import { AugmentedAMM, hasEnoughUnderlyingTokens } from '@utilities';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Agents, useAMMContext, useBorrowAMMContext, usePositionContext } from "@contexts";
import { isUndefined } from 'lodash';
import { SwapFormActions } from "@components/interface";
import * as s from "../SwapFormContext/services";

export type BorrowFormProviderProps = {
  
};

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
  READY_TO_TRADE = 'READY_TO_TRADE'
};

export type BorrowFormContext = {
  variableDebt: UseAsyncFunctionResult<unknown, number | void>;
  selectedFixedDebt?: number;
  selectedFixedDebtPercentage?: number;
  selectedVariableDebt?: number;
  selectedVariableDebtPercentage?: number;
  margin: number;
  setNotional: (value: number) => void;
  errors: Record<string, string>;
  isValid: boolean;
  tokenApprovals: ReturnType<typeof useTokenApproval>;
  hintState: BorrowFormSubmitButtonHintStates;
  approvalsNeeded: boolean;
  isTradeVerified: boolean;
};

const borrowFormCtx = createContext<BorrowFormContext>({} as unknown as BorrowFormContext);
borrowFormCtx.displayName = 'BorrowFormContext';

export const BorrowFormProvider: React.FunctionComponent<BorrowFormProviderProps> = ({
  children
}) => {
  const { amm : borrowAmm } = useBorrowAMMContext();
  const { amm } = useAMMContext();
  const { position } = usePositionContext();
  const { variableDebt, fullyCollateralisedMarginRequirement } = useBorrowAMMContext();

  const [selectedFixedDebt, setSelectedFixedDebt] = useState<BorrowFormContext['selectedFixedDebt']>(undefined);
  const [selectedFixedDebtPercentage, setSelectedFixedDebtPercentage] = useState<BorrowFormContext['selectedFixedDebtPercentage']>(undefined);
  const [selectedVariableDebt, setSelectedVariableDebt] = useState<BorrowFormContext['selectedVariableDebt']>(undefined);
  const [selectedVariableDebtPercentage, setSelectedVariableDebtPercentage] = useState<BorrowFormContext['selectedVariableDebtPercentage']>(undefined);
  const [margin, setMargin] = useState<number>(0);

  const tokenApprovals = useTokenApproval(amm);
  const { swapInfo } = useAMMContext();
  const approvalsNeeded = s.approvalsNeeded(SwapFormActions.SWAP, tokenApprovals, false);
  const isTradeVerified = !!swapInfo.result && !swapInfo.loading && !swapInfo.errorMessage;

  const [errors, setErrors] = useState<BorrowFormContext['errors']>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const touched = useRef<string[]>([]);
  const addError = (err: Record<string, string>, name: string, message: string) => {
    if(touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const validate = async () => {
    const err: Record<string, string> = {};
    let valid = true;

    if(isUndefined(selectedFixedDebt) || selectedFixedDebt === 0) {
      valid = false;
      addError(err, 'margin', 'Please select fixed debt amount');
    }
    
    if(isUndefined(margin)) {
      valid = false;
      addError(err, 'margin', 'Please select fixed debt amount');
    }

    // Check the user has enough balance
    
    if(margin !== 0 && await hasEnoughUnderlyingTokens(amm, margin, undefined) === false) {
      valid = false;
      addError(err, 'margin', 'Insufficient funds');
    }
    

    // Check that the input margin is >= minimum required margin
    // if(lessThan(margin, swapInfo.result?.marginRequirement) === true) {
    //   valid = false;
    //   addError(err, 'margin', 'Not enough margin');
    // }

    setErrors(err);
    setIsValid(valid);
    return valid;
  };

  // Validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      void validate();
    }
  }, [
    margin, 
    selectedFixedDebt,
    // swapInfo.result?.marginRequirement, 
    // swapInfo.result?.fee,
    isValid
  ])

  const getHintState = () => {
    // Please note that the order these are in is important, you need the conditions that take precidence
    // to be nearer the top.

    // Token approvals - Checking current status
    if(tokenApprovals.checkingApprovals) {
      return BorrowFormSubmitButtonHintStates.INITIALISING;
    }
    if(tokenApprovals.approving) {
      return BorrowFormSubmitButtonHintStates.APPROVING;
    }
    // if (swapInfo.loading) {
    //   return BorrowFormSubmitButtonHintStates.CHECKING;
    // }

    // Form validation
    if (!isValid) {
      if(errors.balance) {
        return BorrowFormSubmitButtonHintStates.FORM_INVALID_BALANCE;
      }
      if(!Object.keys(errors).length) {
        return BorrowFormSubmitButtonHintStates.FORM_INVALID_INCOMPLETE;
      }
      return BorrowFormSubmitButtonHintStates.FORM_INVALID;
    }


    if(tokenApprovals.lastError) {
      return BorrowFormSubmitButtonHintStates.ERROR_TOKEN_APPROVAL;
    }
    
    if(tokenApprovals.getNextApproval(false)) {
      if(tokenApprovals.lastApproval) {
        return BorrowFormSubmitButtonHintStates.APPROVE_NEXT_TOKEN;
      } else {
        return BorrowFormSubmitButtonHintStates.APPROVE_TOKEN;
      }
    }


    // // trade info failed
    // if (swapInfo.errorMessage) {
    //   return SwapFormSubmitButtonHintStates.FORM_INVALID_TRADE;
    // }

    if(tokenApprovals.lastApproval) {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE;
    }
  }

  useEffect(() => {
    variableDebt.call(position);
  }, [variableDebt.call]);

  useEffect(() => {
    if (variableDebt.loading || (variableDebt.result === null) || (variableDebt.result === undefined)) {
      return;
    }

    setSelectedFixedDebt(0);
    setSelectedFixedDebtPercentage(0);
    setSelectedVariableDebt(variableDebt.result);
    setSelectedVariableDebtPercentage(100);
  }, [variableDebt.loading, variableDebt.result]);


  const updateNotional = (value: number) => {
    if(!touched.current.includes('margin')) {
      touched.current.push('margin');
    }

    if (variableDebt.loading || (variableDebt.result === null) || (variableDebt.result === undefined)) {
      return;
    }

    setSelectedFixedDebt(variableDebt.result * value / 100)
    setSelectedFixedDebtPercentage(value);

    setSelectedVariableDebt(variableDebt.result * (100 - value) / 100);
    setSelectedVariableDebtPercentage(100 - value);
  }

  useEffect(() => {
    if (swapInfo.loading || (swapInfo.result === null) || (swapInfo.result === undefined)) {
      return;
    }

    fullyCollateralisedMarginRequirement.call({
      fixedTokenBalance: swapInfo.result.fixedTokenDeltaBalance,
      variableTokenBalance: swapInfo.result.variableTokenDeltaBalance
    });

    
  }, [swapInfo.loading, swapInfo.result]);

  useEffect(() => {
    if (fullyCollateralisedMarginRequirement.loading || (fullyCollateralisedMarginRequirement.result === null) || (fullyCollateralisedMarginRequirement.result === undefined)) {
      return;
    }

    setMargin(fullyCollateralisedMarginRequirement.result);
  }, [fullyCollateralisedMarginRequirement.loading, fullyCollateralisedMarginRequirement.result]);

  useEffect(() => {
    if (!approvalsNeeded && !isUndefined(selectedFixedDebt) && selectedFixedDebt !== 0) {
      swapInfo.call({ 
        position,
        margin,
        notional: selectedFixedDebt, 
        type: GetInfoType.NORMAL_SWAP
      });
    }
  }, [selectedFixedDebt]);

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
    approvalsNeeded,
    isTradeVerified
  }
  
  return <borrowFormCtx.Provider value={value}>{children}</borrowFormCtx.Provider>;
};

export const useBorrowFormContext = (): BorrowFormContext => {
  return useContext(borrowFormCtx);
};

export default BorrowFormProvider;
