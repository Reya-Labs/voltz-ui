import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { AugmentedAMM } from '@utilities';
import { actions, selectors } from '@store';
import { MintBurnFormMarginAction, useAgent, useAMMContext, useDispatch, useSelector, useTokenApproval, useWallet } from '@hooks';
import { SwapForm, PendingTransaction } from '@components/interface';
import useSwapForm from 'src/hooks/useSwapForm';
import { getFormAction, getSubmitAction, getSubmitButtonHint, getSubmitButtonText } from './services';
import { SwapFormActions } from './types';
import { isUndefined } from 'lodash';
import { BigNumber } from 'ethers';
import { Token } from '@voltz-protocol/v1-sdk';

export type ConnectedSwapFormProps = {
  amm: AugmentedAMM;
  isEditingMargin?: boolean;
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ 
  amm,
  isEditingMargin = false,
  onReset,
}) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { swapInfo: { call: loadSwapInfo, loading: swapInfoLoading, result: swapInfoData } } = useAMMContext();

  const [balance, setBalance] = useState<BigNumber>();
  const { getTokenBalance } = useWallet();
  const token = useRef<Token>();

  const defaultValues = {};
  const form = useSwapForm(amm, isEditingMargin, balance, swapInfoData?.marginRequirement, defaultValues);
  const tokenApprovals = useTokenApproval(amm);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

  const formAction = getFormAction(isEditingMargin, form.state.partialCollateralization, agent);
  const isRemovingMargin = isEditingMargin && form.state.marginAction === MintBurnFormMarginAction.REMOVE;
  const submitButtonHint = getSubmitButtonHint(amm, formAction, form.errors, form.isValid, tokenApprovals);
  const submitButtonText = getSubmitButtonText(isEditingMargin, tokenApprovals, amm, formAction, agent);

  const handleSubmit = () => {
    if(!form.isValid) return;

    if (formAction === SwapFormActions.FCM_SWAP || formAction === SwapFormActions.FCM_UNWIND) {
      if(!tokenApprovals.FCMApproved) {
        tokenApprovals.approveFCM();
        return;
      } else if(!tokenApprovals.yieldBearingTokenApprovedForFCM) {
        tokenApprovals.approveYieldBearingTokenForFCM();
        return;
      } else if(!tokenApprovals.underlyingTokenApprovedForFCM) {
        tokenApprovals.approveUnderlyingTokenForFCM();
        return;
      }
    } else {
      if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const action = getSubmitAction(amm, formAction, form.state, agent, isRemovingMargin);
    setTransactionId(action.payload.transaction.id)
    dispatch(action)
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  // Load the users balance of the required token 
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

  // Load the swap summary info
  useEffect(() => {
    if (!isUndefined(form.state.notional) && form.state.notional !== 0) {
      loadSwapInfo({ notional: form.state.notional });
    }
  }, [loadSwapInfo, form.state.notional, agent]);

  if (!amm) {
    return null;
  }
  
  if (activeTransaction) {
    return (
      <PendingTransaction 
        amm={amm} 
        isEditingMargin={isEditingMargin} 
        transactionId={transactionId} 
        onComplete={handleComplete} 
        onBack={handleGoBack} 
      />
    );
  }

  return (
    <SwapForm
      endDate={amm.endDateTime}
      errors={form.errors}
      formState={form.state}
      isEditingMargin={isEditingMargin}
      isFormValid={form.isValid}
      onCancel={onReset}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={handleSubmit}
      protocol={amm.protocol}
      startDate={amm.startDateTime}
      swapInfo={swapInfoData}
      swapInfoLoading={swapInfoLoading}
      submitButtonHint={submitButtonHint}
      submitButtonText={submitButtonText}
      tokenApprovals={tokenApprovals}
      underlyingTokenName={amm.underlyingToken.name}
    />
  );
};

export default ConnectedSwapForm;
