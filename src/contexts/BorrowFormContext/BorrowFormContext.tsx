import { GetInfoType, useAgent, UseAsyncFunctionResult, useBalance, useTokenApproval } from '@hooks';
import { hasEnoughUnderlyingTokens, lessThan, lessThanEpsilon } from '@utilities';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Agents, useAMMContext, useBorrowAMMContext, usePositionContext } from "@contexts";
import { isUndefined } from 'lodash';
import { SwapFormActions } from "@components/interface";
import * as s from "../SwapFormContext/services";
import { InfoPostSwap } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type BorrowFormProviderProps = {
  
};

export enum BorrowFormSubmitButtonStates {
  APPROVE_UT_PERIPHERY = 'APPROVE_UT_PERIPHERY',
  APPROVING = 'APPROVING',
  CHECKING = 'CHECKING',
  INITIALISING = 'INITIALISING',
  FIX_RATE = 'FIX_RATE',
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
  }
  balance: number;
  warningText?: string;
};

const borrowFormCtx = createContext<BorrowFormContext>({} as unknown as BorrowFormContext);
borrowFormCtx.displayName = 'BorrowFormContext';

export const BorrowFormProvider: React.FunctionComponent<BorrowFormProviderProps> = ({
  children
}) => {
  const { amm } = useAMMContext();
  const { position } = usePositionContext();
  const { variableDebtInNativeTokens: variableDebt, fullyCollateralisedMarginRequirement } = useBorrowAMMContext();
  const balance = useBalance(amm, undefined);

  const [selectedFixedDebt, setSelectedFixedDebt] = useState<BorrowFormContext['selectedFixedDebt']>(0);
  const [selectedFixedDebtPercentage, setSelectedFixedDebtPercentage] = useState<BorrowFormContext['selectedFixedDebtPercentage']>(0);
  const [selectedVariableDebt, setSelectedVariableDebt] = useState<BorrowFormContext['selectedVariableDebt']>(0);
  const [selectedVariableDebtPercentage, setSelectedVariableDebtPercentage] = useState<BorrowFormContext['selectedVariableDebtPercentage']>(0);
  const [margin, setMargin] = useState<number>(0);

  const asyncCallsLoading = useRef<string[]>([]);
  const [ isTradeInfoLoading, setIsTradeInfoLoading ] = useState<boolean>(false);

  const tokenApprovals = useTokenApproval(amm, true);
  const { swapInfo } = useAMMContext();
  const approvalsNeeded = s.approvalsNeeded(SwapFormActions.SWAP, tokenApprovals, false);
  const isTradeVerified = 
    !isTradeInfoLoading &&
    !!swapInfo.result && !swapInfo.errorMessage && 
    !!fullyCollateralisedMarginRequirement.result && !fullyCollateralisedMarginRequirement.errorMessage;

  const [ isAvailableNotionalInsufficient, setIsAvailableNotionalInsufficient] = useState<boolean>(false);

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
    if(touched.current.includes(name)) {
      err[name] = message;
    }
  };

  const [warningText, setWarningText] = useState<string|undefined>(undefined);

  const validate = async () => {
    const err: Record<string, string> = {};
    let valid = true;
    let warnText: (string | undefined) = undefined;

    if(isUndefined(selectedFixedDebt) || selectedFixedDebt === 0) {
      valid = false;
      addError(err, 'slider', 'Please select fixed debt amount');
    }

    if (asyncCallsLoading.current.includes('swapInfo') && !swapInfo.loading && swapInfo.result?.availableNotional !== undefined && lessThanEpsilon(swapInfo.result?.availableNotional, selectedFixedDebt ?? 0, 0.0000001) === true) {
      updateNotional(
       Math.floor((swapInfo.result?.availableNotional / (variableDebt.result as number) * 1000 / 25)) * 2.5
      );
      setIsAvailableNotionalInsufficient(true);
      valid = false;
    }

    if (isAvailableNotionalInsufficient) {
      // valid = false;
      warnText = "There is not enough liquidity in the pool to fix all of your debt. The position the slider is in now is the maximum amount of variable debt you can fix.";
    }
    
    if(isUndefined(margin)) {
      valid = false;
      addError(err, 'slider', 'Please select fixed debt amount');
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
    setWarningText(warnText);
    return valid;
  };

  // 4
  // Validate the form after values change
  useEffect(() => {
    if(touched.current.length) {
      void validate();
    }
  }, [
    margin,
    selectedFixedDebt,
    isTradeInfoLoading,
    swapInfo.result?.availableNotional,
    swapInfo.result?.marginRequirement,
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
    if (isTradeInfoLoading) {
      return BorrowFormSubmitButtonHintStates.CHECKING;
    }

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
    if (swapInfo.errorMessage || fullyCollateralisedMarginRequirement.errorMessage) {
      return BorrowFormSubmitButtonHintStates.FORM_INVALID_TRADE;
    }

    if(tokenApprovals.lastApproval) {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE_TOKENS_APPROVED;
    } else {
      return BorrowFormSubmitButtonHintStates.READY_TO_TRADE;
    }
  }

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

    if(!touched.current.includes('slider')) {
      touched.current.push('slider');
    }

    if (variableDebt.loading || (variableDebt.result === null) || (variableDebt.result === undefined)) {
      return;
    }

    setIsAvailableNotionalInsufficient(false);

    if (value === selectedFixedDebtPercentage) {
      return;
    }

    asyncCallsLoading.current = [];
    setIsTradeInfoLoading(true);

    setSelectedFixedDebt(variableDebt.result * value / 100)
    setSelectedFixedDebtPercentage(value);

    setSelectedVariableDebt(variableDebt.result * (100 - value) / 100);
    setSelectedVariableDebtPercentage(100 - value);
  }

  // 2
  useEffect(() => {
    if (asyncCallsLoading.current.includes('zero_margin')) {
      return;
    }

    if (swapInfo.loading) {
      setIsTradeInfoLoading(true);
      if (!asyncCallsLoading.current.includes('swapInfo')) {
        asyncCallsLoading.current.push('swapInfo');
      }
      return;
    } 
    
    if ((swapInfo.result === null) || (swapInfo.result === undefined)) {
      if (asyncCallsLoading.current.includes('swapInfo')) {
        setIsTradeInfoLoading(false);
      }
      return;
    }

    fullyCollateralisedMarginRequirement.call({
      fixedTokenBalance: swapInfo.result.fixedTokenDeltaBalance,
      variableTokenBalance: swapInfo.result.variableTokenDeltaBalance,
      fee: swapInfo.result.fee
    });

  }, [swapInfo.loading, swapInfo.result]);

  // 3
  useEffect(() => {
    if (fullyCollateralisedMarginRequirement.loading) {
      setIsTradeInfoLoading(true);
      if (!asyncCallsLoading.current.includes("fullyCollateralisedMarginRequirement")) {
        asyncCallsLoading.current.push('fullyCollateralisedMarginRequirement');
      }
      return;
    } 

    if (asyncCallsLoading.current.includes('fullyCollateralisedMarginRequirement')) {
      setIsTradeInfoLoading(false);
    }
    
    if ((fullyCollateralisedMarginRequirement.result === null) || (fullyCollateralisedMarginRequirement.result === undefined)) {
      return;
    }

    if (!asyncCallsLoading.current.includes("fullyCollateralisedMarginRequirement") || !asyncCallsLoading.current.includes("swapInfo")) {
      return;
    }

    if (swapInfo.result?.marginRequirement !== undefined && swapInfo.result?.marginRequirement > fullyCollateralisedMarginRequirement.result) {
      setMargin(swapInfo.result?.marginRequirement);
    } else {
      setMargin(fullyCollateralisedMarginRequirement.result);
    }
  }, [fullyCollateralisedMarginRequirement.loading, fullyCollateralisedMarginRequirement.result]);

  // 1
  useEffect(() => {
    if (!approvalsNeeded && !isUndefined(selectedFixedDebt)) {
      asyncCallsLoading.current = [];
      if ( selectedFixedDebt === 0) {
        asyncCallsLoading.current.push('zero_margin');
        setMargin(0);
        setIsTradeInfoLoading(false);
      } else {
        setIsTradeInfoLoading(true);
        swapInfo.call({ 
          position,
          margin,
          notional: selectedFixedDebt, 
          type: GetInfoType.NORMAL_SWAP,
          fixedLow: 0.001,
          fixedHigh: 990
        });
      }
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
    submitButtonState: getSubmitButtonState(),
    approvalsNeeded,
    isTradeVerified,
    borrowInfo: {
      data: swapInfo.result || undefined,
      errorMessage: swapInfo.errorMessage || (fullyCollateralisedMarginRequirement.errorMessage || undefined),
      loading: isTradeInfoLoading
    },
    balance: balance,
    warningText
  }
  
  return <borrowFormCtx.Provider value={value}>{children}</borrowFormCtx.Provider>;
};

export const useBorrowFormContext = (): BorrowFormContext => {
  return useContext(borrowFormCtx);
};

export default BorrowFormProvider;
