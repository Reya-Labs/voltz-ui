import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { SwapCurrentPosition, SwapForm, SwapInfo, PendingTransaction, SwapFormActions, FormPanel, SwapFormModes } from '@components/interface';
import { Agents, useAMMContext, usePositionContext, useSwapFormContext } from '@contexts';
import { BigNumber } from 'ethers';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type ConnectedSwapFormProps = {
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const { amm } = useAMMContext();
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
      ammId: amm.id,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: form.state.notional as number,
      partialCollateralization: agent === Agents.FIXED_TRADER ? form.state.partialCollateralization : true
    };

    if(form.mode === SwapFormModes.ROLLOVER) {
      return actions.rolloverSwapAction(amm, { 
        ...transaction,
        isFT: agent === Agents.FIXED_TRADER,
        fixedRateLimit: undefined,
        margin: amm.isETH ? 0 : Math.abs(form.state.margin as number),
        marginEth: amm.isETH ? Math.abs(form.state.margin as number) : undefined,
        newMarginEngine: amm.marginEngineAddress,
        oldFixedHigh: (position as Position).fixedRateUpper.toNumber(),
        oldFixedLow: (position as Position).fixedRateLower.toNumber()
      });
    }
  
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

      case SwapFormActions.SWAP:
      case SwapFormActions.ROLLOVER_SWAP: {
        return (
          <PendingTransaction
            amm={amm}
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
            amm={amm}
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
    <>
      {position 
        ? <SwapCurrentPosition formMode={form.mode} onPortfolio={onReset} position={position} />
        : <FormPanel noBackground />
      }
      <SwapForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.balance}
        endDate={amm.endDateTime}
        errors={form.errors}
        formAction={form.action} 
        formState={form.state}
        hintState={form.hintState}
        isFCMAction={form.isFCMAction}
        isFCMAvailable={amm.isFCM}
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
        protocol={amm.protocol}
        startDate={amm.startDateTime}
        swapInfo={form.swapInfo.data}
        swapInfoLoading={form.swapInfo.loading}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.swapInfo.errorMessage}
        underlyingTokenName={amm.underlyingToken.name}
      />
      <SwapInfo
        balance={form.balance}
        formAction={form.action} 
        minRequiredMargin={form.minRequiredMargin}
        mode={mode}
        onChangeMovesRatesBy={form.setRatesMoveBy}
        positionMargin={position?.margin ? amm.descale(BigNumber.from(position.margin.toString())) : undefined}
        protocol={amm.protocol}
        ratesMoveBy={form.ratesMoveBy}
        swapSummary={form.swapInfo.data}
        swapSummaryLoading={form.swapInfo.loading}
        underlyingTokenName={amm.underlyingToken.name}
      />
    </>
  );
};

export default ConnectedSwapForm;
