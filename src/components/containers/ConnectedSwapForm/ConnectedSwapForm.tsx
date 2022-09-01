import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { SwapCurrentPosition, SwapForm, SwapInfo, PendingTransaction, SwapFormActions, FormPanel, SwapFormModes } from '@components/interface';
import { Agents, useAMMContext, usePositionContext, useSwapFormContext } from '@contexts';
import { BigNumber } from 'ethers';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';

export type ConnectedSwapFormProps = {
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const { amm: targetAmm } = useAMMContext();
  const { amm: positionAmm } = usePositionContext();
  const dispatch = useDispatch();
  const form = useSwapFormContext();
  const navigate = useNavigate();
  const { position } = usePositionContext();

  const { mode } = form;
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

  const getReduxAction = () => {
    const transaction = { 
      agent,
      ammId: targetAmm.id,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: form.state.notional as number,
      partialCollateralization: agent === Agents.FIXED_TRADER ? form.state.partialCollateralization : true
    };

    if(form.mode === SwapFormModes.ROLLOVER) {
      return actions.rolloverSwapAction(positionAmm as AugmentedAMM, { 
        ...transaction,
        ammId: (positionAmm as AugmentedAMM).id,
        isFT: agent === Agents.FIXED_TRADER,
        fixedRateLimit: undefined,
        margin: targetAmm.isETH ? 0 : Math.abs(form.state.margin as number),
        marginEth: targetAmm.isETH ? Math.abs(form.state.margin as number) : undefined,
        newMarginEngine: targetAmm.marginEngineAddress,
      });
    }

    if(form.state.notional == 0 && form.mode === SwapFormModes.EDIT_NOTIONAL) {
      return actions.updatePositionMarginAction(targetAmm, transaction);
    }
  
    switch(form.action) {
      case SwapFormActions.UPDATE:
        return actions.updatePositionMarginAction(targetAmm, transaction);
      case SwapFormActions.SWAP:
        return actions.swapAction(targetAmm, transaction);
      case SwapFormActions.FCM_SWAP:
        return actions.fcmSwapAction(targetAmm, transaction);
      // case SwapFormActions.FCM_UNWIND:
      //   return actions.fcmUnwindAction(targetAmm, transaction); 
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

  if (!targetAmm) {
    return null;
  }
  
  if (activeTransaction) {

    switch (form.action) {
      case SwapFormActions.UPDATE: {
        return (
          <PendingTransaction
            amm={targetAmm}
            isEditingMargin={true}
            transactionId={transactionId}
            onComplete={handleComplete}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
          />
        );
      }

      case SwapFormActions.SWAP:
      case SwapFormActions.ROLLOVER_SWAP: {
        return (
          <PendingTransaction
            amm={targetAmm}
            isEditingMargin={false}
            isRollover={form.mode === SwapFormModes.ROLLOVER}
            transactionId={transactionId}
            onComplete={handleComplete}
            notional={form.swapInfo.data?.availableNotional}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
          />
        );
      }

      case SwapFormActions.FCM_SWAP:
      case SwapFormActions.ROLLOVER_FCM_SWAP: {
        return (
          <PendingTransaction
            amm={targetAmm}
            isEditingMargin={false}
            isRollover={form.mode === SwapFormModes.ROLLOVER}
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
            amm={targetAmm}
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
    <>
      {position 
        ? <SwapCurrentPosition formMode={form.mode} onPortfolio={handleComplete} position={position} />
        : <FormPanel noBackground />
      }
      <SwapForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.balance}
        endDate={targetAmm.endDateTime}
        errors={form.errors}
        formAction={form.action} 
        formState={form.state}
        hintState={form.hintState}
        isFCMAction={form.isFCMAction}
        // isFCMAvailable={targetAmm.isFCM}
        isFCMAvailable={false}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        mode={mode}
        onCancel={onReset}
        onChangeLeverage={form.setLeverage}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onChangePartialCollateralization={form.setPartialCollateralization}
        onSubmit={handleSubmit}
        protocol={targetAmm.protocol}
        startDate={targetAmm.startDateTime}
        swapInfo={form.swapInfo.data}
        swapInfoLoading={form.swapInfo.loading}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.swapInfo.errorMessage}
        underlyingTokenName={targetAmm.underlyingToken.name}
      />
      <SwapInfo
        balance={form.balance}
        formAction={form.action} 
        minRequiredMargin={form.minRequiredMargin}
        mode={mode}
        positionMargin={position?.margin ? targetAmm.descale(BigNumber.from(position.margin.toString())) : undefined}
        protocol={targetAmm.protocol}
        swapSummary={(!isUndefined(form.state.notional)) ? form.swapInfo.data : undefined}
        swapSummaryLoading={form.swapInfo.loading}
        underlyingTokenName={targetAmm.underlyingToken.name}
        warningText={form.warningText}
        maxAvailableNotional={form.swapInfo.maxAvailableNotional}
        expectedApy={form.swapInfo.expectedApy}
      />
    </>
  );
};

export default ConnectedSwapForm;
