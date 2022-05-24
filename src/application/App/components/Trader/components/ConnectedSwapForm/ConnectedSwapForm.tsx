import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { AugmentedAMM } from '@utilities';
import { AMMProvider } from '@components/contexts';
import { actions, selectors } from '@store';
import { MintBurnFormMarginAction, useAgent, useDispatch, useSelector, useTokenApproval } from '@hooks';
import { SwapForm, PendingTransaction } from '@components/interface';
import useSwapForm from 'src/hooks/useSwapForm';
import { getFormAction, getSubmitAction, getSubmitButtonHint, getSubmitButtonText } from './services';
import { SwapFormActions } from './types';

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

  const defaultValues = {};
  const form = useSwapForm(amm, isEditingMargin, defaultValues);
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
    <AMMProvider amm={amm}>
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
        submitButtonHint={submitButtonHint}
        submitButtonText={submitButtonText}
        tokenApprovals={tokenApprovals}
        underlyingTokenName={amm.underlyingToken.name}
      />
    </AMMProvider>
  );
};

export default ConnectedSwapForm;
