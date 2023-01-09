import { AMM, Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Agents } from '../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { useAMMsContext } from '../../../contexts/AMMsContext/AMMsContext';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { useSwapFormContext } from '../../../contexts/SwapFormContext/SwapFormContext';
import { useAgent } from '../../../hooks/useAgent';
import { useWallet } from '../../../hooks/useWallet';
import { routes } from '../../../routes/paths';
import { actions, selectors } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isBorrowing } from '../../../utilities/amm';
import { getPoolButtonId } from '../../../utilities/googleAnalytics/helpers';
import { setPageTitle } from '../../../utilities/page';
import { FormPanel } from '../../interface/FormPanel/FormPanel';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { SwapCurrentPosition } from '../../interface/SwapCurrentPosition/SwapCurrentPosition';
import { SwapForm } from '../../interface/SwapForm/SwapForm';
import { SwapFormActions, SwapFormModes } from '../../interface/SwapForm/types';
import { SwapInfo } from '../../interface/SwapInfo/SwapInfo';
import { getNotionalActionFromHintState } from './helpers';

export type ConnectedSwapFormProps = {
  onReset: () => void;
};

export const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const { amm: targetAmm } = useAMMContext();
  const { amm: positionAmm } = usePositionContext();
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const form = useSwapFormContext();
  const navigate = useNavigate();
  const { position } = usePositionContext();

  const { mode } = form;
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useAppSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

  const { variableApy, fixedApr } = useAMMsContext();
  const { result: resultFixedApr, call: callFixedApr } = fixedApr(targetAmm);
  const { result: resultVariableApy, call: callVariableApy } = variableApy(targetAmm);

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  useEffect(() => {
    callVariableApy();
  }, [callVariableApy]);

  const getReduxAction = () => {
    const transaction = {
      agent,
      ammId: targetAmm.id,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: form.state.notional as number,
    };

    if (form.mode === SwapFormModes.ROLLOVER) {
      return actions.rolloverSwapAction(positionAmm as AMM, {
        ...transaction,
        ammId: (positionAmm as AMM).id,
        isFT: agent === Agents.FIXED_TRADER,
        margin: Math.abs(form.state.margin as number),
        newMarginEngine: targetAmm.marginEngineAddress,
        rolloverPosition: {
          tickLower: (position as Position).tickLower,
          tickUpper: (position as Position).tickUpper,
          settlementBalance: (position as Position).settlementBalance,
        },
      });
    }

    if (form.state.notional === 0 && form.mode === SwapFormModes.EDIT_NOTIONAL) {
      return actions.updatePositionMarginAction(targetAmm, transaction);
    }

    switch (form.action) {
      case SwapFormActions.UPDATE:
        return actions.updatePositionMarginAction(targetAmm, transaction);
      case SwapFormActions.SWAP:
        return actions.swapAction(targetAmm, transaction);
    }
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.TRADER_PORTFOLIO}`);
  };

  const handleGoBack = () => {
    setPageTitle(`${position ? 'Edit' : 'New'} Trader Position`, account);
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  };

  const handleSubmit = () => {
    if (!form.isValid) return;

    if (!form.isRemovingMargin) {
      if (!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
        void form.tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const action = getReduxAction();
    if (action) {
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
            fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
            isEditingMargin={true}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            position={position}
            transactionId={transactionId}
            variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
            onBack={handleGoBack}
            onComplete={handleComplete}
          />
        );
      }

      case SwapFormActions.SWAP:
      case SwapFormActions.ROLLOVER_SWAP: {
        const isRemovingNotional =
          (agent === Agents.VARIABLE_TRADER && (position?.variableTokenBalance ?? 0) < 0) ||
          (agent === Agents.FIXED_TRADER && (position?.variableTokenBalance ?? 0) > 0);
        return (
          <PendingTransaction
            amm={targetAmm}
            fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
            isEditingMargin={false}
            isRollover={form.mode === SwapFormModes.ROLLOVER}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            notional={form.swapInfo.data?.availableNotional}
            position={position}
            showNegativeNotional={form.mode === SwapFormModes.EDIT_NOTIONAL && isRemovingNotional}
            transactionId={transactionId}
            variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
            onBack={handleGoBack}
            onComplete={handleComplete}
          />
        );
      }
    }
  }

  const buttonId = getPoolButtonId(
    form.state.marginAction.toString(),
    '',
    getNotionalActionFromHintState(form.hintState),
    agent,
    isBorrowing(targetAmm.rateOracle.protocolId),
    targetAmm.protocol,
  );

  return (
    <>
      {position ? (
        <SwapCurrentPosition
          formMode={form.mode}
          gaButtonId={buttonId}
          position={position}
          onPortfolio={handleComplete}
        />
      ) : (
        <FormPanel noBackground />
      )}
      <SwapForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.balance}
        currentPositionMarginRequirement={form.currentPositionMarginRequirement}
        endDate={targetAmm.endDateTime}
        errors={form.errors}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
        formAction={form.action}
        formState={form.state}
        gaButtonId={buttonId}
        hintState={form.hintState}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        mode={mode}
        protocol={targetAmm.protocol}
        startDate={targetAmm.startDateTime}
        submitButtonState={form.submitButtonState}
        swapInfo={form.swapInfo.data}
        swapInfoLoading={form.swapInfo.loading}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.swapInfo.errorMessage}
        underlyingTokenName={targetAmm.underlyingToken.name}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        onCancel={onReset}
        onChangeLeverage={form.setLeverage}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onSubmit={handleSubmit}
      />
      <SwapInfo
        balance={form.balance}
        currentPositionMarginRequirement={form.currentPositionMarginRequirement}
        expectedApy={form.expectedApy}
        expectedCashflow={form.expectedCashflow}
        formAction={form.action}
        maxAvailableNotional={form.swapInfo.maxAvailableNotional}
        mode={mode}
        positionMargin={position?.margin}
        protocol={targetAmm.protocol}
        swapSummary={!isUndefined(form.state.notional) ? form.swapInfo.data : undefined}
        swapSummaryLoading={form.swapInfo.loading}
        underlyingTokenName={targetAmm.underlyingToken.name}
        userSimulatedVariableApy={form.userSimulatedVariableApy}
        userSimulatedVariableApyUpdated={form.userSimulatedVariableApyUpdated}
        warningText={form.warningText}
        onChangeUserSimulatedVariableApy={form.setUserSimulatedVariableApy}
      />
    </>
  );
};
