import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../../routes/paths';
import { actions, selectors } from '../../../store';
import { BigNumber } from 'ethers';
import isUndefined from 'lodash/isUndefined';

import { AMM } from '@voltz-protocol/v1-sdk';
import { SwapForm, SwapFormActions, SwapFormModes } from '../../interface/SwapForm';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { SwapCurrentPosition } from '../../interface/SwapCurrentPosition';
import { FormPanel } from '../../interface/FormPanel/FormPanel';
import { SwapInfo } from '../../interface/SwapInfo';
import { useWallet } from '../../../hooks/useWallet';
import { useAMMsContext } from '../../../contexts/AMMsContext/AMMsContext';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { Agents } from '../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { useSwapFormContext } from '../../../contexts/SwapFormContext/SwapFormContext';
import { useAgent } from '../../../hooks/useAgent';
import { useDispatch } from '../../../hooks/useDispatch';
import { useSelector } from '../../../hooks/useSelector';
import {
  getNotionalActionFromHintState,
  getPoolButtonId,
} from '../../../utilities/googleAnalytics';
import { setPageTitle } from '../../../utilities/page';
import { isBorrowing } from '../../../utilities/isBorrowing';

export type ConnectedSwapFormProps = {
  onReset: () => void;
};

export const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const { amm: targetAmm } = useAMMContext();
  const { amm: positionAmm } = usePositionContext();
  const { account } = useWallet();
  const dispatch = useDispatch();
  const form = useSwapFormContext();
  const navigate = useNavigate();
  const { position } = usePositionContext();

  const { mode } = form;
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

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
        fixedRateLimit: undefined,
        margin: targetAmm.isETH ? 0 : Math.abs(form.state.margin as number),
        marginEth: targetAmm.isETH ? Math.abs(form.state.margin as number) : undefined,
        newMarginEngine: targetAmm.marginEngineAddress,
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
    navigate(`/${routes.PORTFOLIO}`);
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
            position={position}
            isEditingMargin={true}
            transactionId={transactionId}
            onComplete={handleComplete}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
            variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
            fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
          />
        );
      }

      case SwapFormActions.SWAP:
      case SwapFormActions.ROLLOVER_SWAP: {
        const isRemovingNotional =
          (agent === Agents.VARIABLE_TRADER &&
            (position?.effectiveVariableTokenBalance ?? 0) < 0) ||
          (agent === Agents.FIXED_TRADER && (position?.effectiveVariableTokenBalance ?? 0) > 0);
        return (
          <PendingTransaction
            amm={targetAmm}
            position={position}
            isEditingMargin={false}
            showNegativeNotional={form.mode === SwapFormModes.EDIT_NOTIONAL && isRemovingNotional}
            isRollover={form.mode === SwapFormModes.ROLLOVER}
            transactionId={transactionId}
            onComplete={handleComplete}
            notional={form.swapInfo.data?.availableNotional}
            margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)}
            onBack={handleGoBack}
            variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
            fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
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
          onPortfolio={handleComplete}
          position={position}
          gaButtonId={buttonId}
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
        formAction={form.action}
        formState={form.state}
        hintState={form.hintState}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        mode={mode}
        onCancel={onReset}
        onChangeLeverage={form.setLeverage}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onSubmit={handleSubmit}
        protocol={targetAmm.protocol}
        gaButtonId={buttonId}
        startDate={targetAmm.startDateTime}
        swapInfo={form.swapInfo.data}
        swapInfoLoading={form.swapInfo.loading}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.swapInfo.errorMessage}
        underlyingTokenName={targetAmm.underlyingToken.name}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
      />
      <SwapInfo
        balance={form.balance}
        currentPositionMarginRequirement={form.currentPositionMarginRequirement}
        formAction={form.action}
        mode={mode}
        positionMargin={
          position?.margin
            ? targetAmm.descale(BigNumber.from(position.margin.toString()))
            : undefined
        }
        protocol={targetAmm.protocol}
        swapSummary={!isUndefined(form.state.notional) ? form.swapInfo.data : undefined}
        swapSummaryLoading={form.swapInfo.loading}
        underlyingTokenName={targetAmm.underlyingToken.name}
        warningText={form.warningText}
        maxAvailableNotional={form.swapInfo.maxAvailableNotional}
        expectedApy={form.expectedApy}
        expectedCashflow={form.expectedCashflow}
        userSimulatedVariableApy={form.userSimulatedVariableApy}
        onChangeUserSimulatedVariableApy={form.setUserSimulatedVariableApy}
        userSimulatedVariableApyUpdated={form.userSimulatedVariableApyUpdated}
      />
    </>
  );
};
