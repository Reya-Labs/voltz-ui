import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { AugmentedAMM } from '@utilities';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector, useSwapForm } from '@hooks';
import { SwapForm, PendingTransaction, SwapFormActions, SwapFormModes } from '@components/interface';
import { Agents } from '@components/contexts';
import { Position } from '@voltz-protocol/v1-sdk';

export type ConnectedSwapFormProps = {
  amm: AugmentedAMM;
  mode?: SwapFormModes;
  onReset: () => void;
  position?: Position;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ 
  amm,
  mode = SwapFormModes.NEW_POSITION,
  onReset,
  position,
}) => {
  const { agent, onChangeAgent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = {};
  const form = useSwapForm(position, amm, mode, defaultValues);
  
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

  const getReduxAction = () => {
    const transaction = { 
      agent,
      ammId: amm.id,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: form.state.notional as number,
      partialCollateralization: agent === Agents.FIXED_TRADER ? form.state.partialCollateralization : true
    };
  
    switch(form.action) {
      case SwapFormActions.UPDATE:
        return actions.updatePositionMarginAction(amm, transaction);
      case SwapFormActions.SWAP:
        return actions.swapAction(amm, transaction);
      case SwapFormActions.FCM_SWAP:
        return actions.fcmSwapAction(amm, transaction);
      // case SwapFormActions.FCM_UNWIND:
      //   return actions.fcmUnwindAction(amm, transaction); 
    }
  }

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  const handleSubmit = () => {
    if(!form.isValid) return;

    if(!form.isRemovingMargin) {
      if (form.action === SwapFormActions.FCM_SWAP || form.action === SwapFormActions.FCM_UNWIND) {
        if(!form.tokenApprovals.FCMApproved) {
          void form.tokenApprovals.approveFCM();
          return;
        } else if(!form.tokenApprovals.yieldBearingTokenApprovedForFCM) {
          void form.tokenApprovals.approveYieldBearingTokenForFCM();
          return;
        } else if(!form.tokenApprovals.underlyingTokenApprovedForFCM) {
          void form.tokenApprovals.approveUnderlyingTokenForFCM();
          return;
        }
      } else {
        if(!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
          void form.tokenApprovals.approveUnderlyingTokenForPeriphery();
          return;
        }
      }
    }

    const action = getReduxAction();
    if(action) {
      setTransactionId(action.payload.transaction.id);
      dispatch(action);
    }
  };

  if (!amm) {
    return null;
  }
  
  if (activeTransaction) {

    switch (form.action) {
      case SwapFormActions.UPDATE: {
        return (
          <PendingTransaction
            amm={amm}
            isEditingMargin={true}
            transactionId={transactionId}
            onComplete={handleComplete}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
          />
        );
      }

      case SwapFormActions.SWAP: {
        return (
          <PendingTransaction
            amm={amm}
            isEditingMargin={false}
            transactionId={transactionId}
            onComplete={handleComplete}
            notional={form.swapInfo.data?.availableNotional}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
          />
        );
      }

      case SwapFormActions.FCM_SWAP: {
        return (
          <PendingTransaction
            amm={amm}
            isEditingMargin={false}
            transactionId={transactionId}
            onComplete={handleComplete}
            isFCMSwap={true}
            notional={form.swapInfo.data?.availableNotional}
            margin={form.swapInfo.data?.marginRequirement}
            onBack={handleGoBack}
          />
        );
      }

      case SwapFormActions.FCM_UNWIND: {
        return (
          <PendingTransaction
            amm={amm}
            isEditingMargin={false}
            transactionId={transactionId}
            onComplete={handleComplete}
            isFCMUnwind={true}
            notional={form.swapInfo.data?.availableNotional}
            onBack={handleGoBack}
          />
        );
      }
    }
  }

  return (
    <SwapForm
      balance={form.balance ? amm.descale(form.balance) : undefined}
      endDate={amm.endDateTime}
      errors={form.errors}
      formAction={form.action} 
      formState={form.state}
      isFormValid={form.isValid}
      minRequiredMargin={form.minRequiredMargin}
      mode={mode}
      onCancel={onReset}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction}
      onChangeNotional={form.setNotional}
      onChangePartialCollateralization={form.setPartialCollateralization}
      onSubmit={handleSubmit}
      protocol={amm.protocol}
      startDate={amm.startDateTime}
      swapInfo={form.swapInfo.data}
      swapInfoLoading={form.swapInfo.loading}
      submitButtonHint={form.submitButtonHint}
      submitButtonText={form.submitButtonText}
      tokenApprovals={form.tokenApprovals}
      underlyingTokenName={amm.underlyingToken.name}
    />
  );
};

export default ConnectedSwapForm;
