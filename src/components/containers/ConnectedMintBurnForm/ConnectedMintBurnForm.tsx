import { AMM, Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { useAMMsContext } from '../../../contexts/AMMsContext/AMMsContext';
import {
  MintBurnFormActions,
  MintBurnFormModes,
  useMintBurnForm,
} from '../../../contexts/MintBurnFormContext/MintBurnFormContext';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { useAgent } from '../../../hooks/useAgent';
import { routes } from '../../../routes/paths';
import { actions, selectors } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isBorrowing } from '../../../utilities/amm';
import { getPoolButtonId } from '../../../utilities/googleAnalytics/helpers';
import { setPageTitle } from '../../../utilities/page';
import { FormPanel } from '../../interface/FormPanel/FormPanel';
import { MintBurnCurrentPosition } from '../../interface/MintBurnCurrentPosition/MintBurnCurrentPosition';
import { MintBurnForm } from '../../interface/MintBurnForm/MintBurnForm';
import { MintBurnInfo } from '../../interface/MintBurnInfo';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { updateFixedRate } from './utilities/updateFixedRate';

export type ConnectedMintBurnFormProps = {
  onReset: () => void;
};

export const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  onReset,
}) => {
  const { amm: targetAmm } = useAMMContext();
  const { amm: positionAmm } = usePositionContext();
  const { agent } = useAgent();
  const dispatch = useAppDispatch();
  const form = useMintBurnForm();
  const navigate = useNavigate();
  const { position } = usePositionContext();

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useAppSelector(selectors.transactionSelector)(transactionId);

  const { fixedApr, variableApy } = useAMMsContext();
  const { result: resultFixedApr, call: callFixedApr } = fixedApr(targetAmm);
  const { result: resultVariableApy, call: callVariableApy } = variableApy(targetAmm);

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  useEffect(() => {
    callVariableApy();
  }, [callVariableApy]);

  const getSubmitReduxAction = () => {
    const transaction = {
      ammId: targetAmm.id,
      agent,
      fixedLow: form.state.fixedLow,
      fixedHigh: form.state.fixedHigh,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: Math.abs(form.state.notional as number) * (form.isRemovingLiquidity ? -1 : 1),
    };

    if (form.mode === MintBurnFormModes.ROLLOVER) {
      return actions.rolloverMintAction(positionAmm as AMM, {
        ...transaction,
        ammId: (positionAmm as AMM).id,
        margin: Math.abs(form.state.margin as number),
        newMarginEngine: targetAmm.marginEngineAddress,
        rolloverPosition: {
          tickLower: (position as Position).tickLower,
          tickUpper: (position as Position).tickUpper,
          settlementBalance: (position as Position).settlementBalance,
        },
      });
    }

    switch (form.action) {
      case MintBurnFormActions.UPDATE:
        return actions.updatePositionMarginAction(targetAmm, transaction);
      case MintBurnFormActions.MINT:
        return actions.mintAction(targetAmm, transaction);
      case MintBurnFormActions.BURN:
        return actions.burnAction(targetAmm, transaction);
    }
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_PORTFOLIO}`);
  };

  const handleGoBack = () => {
    setPageTitle(`${position ? 'Edit' : 'New'} Liquidity Provider Position`);
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  };

  const handleSetFixedHigh = useCallback(
    updateFixedRate({
      amm: targetAmm,
      fixedRate: form.state.fixedHigh,
      setFixedRate: form.setFixedHigh,
    }),
    [targetAmm, form.state.fixedHigh, form.setFixedHigh],
  );

  const handleSetFixedLow = useCallback(
    updateFixedRate({
      amm: targetAmm,
      fixedRate: form.state.fixedLow,
      setFixedRate: form.setFixedLow,
    }),
    [targetAmm, form.state.fixedLow, form.setFixedLow],
  );

  const handleSubmit = () => {
    if (!form.isValid) return;

    if (!form.isRemovingLiquidity && !form.isRemovingMargin) {
      if (!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
        form.tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const reduxAction = getSubmitReduxAction();
    if (reduxAction) {
      setTransactionId(reduxAction.payload.transaction.id);
      dispatch(reduxAction);
    }
  };

  if (!targetAmm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction
        amm={targetAmm}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
        isEditingMargin={form.mode === MintBurnFormModes.EDIT_MARGIN}
        isRollover={form.mode === MintBurnFormModes.ROLLOVER}
        liquidityAction={form.state.liquidityAction}
        margin={
          isUndefined(form.state.margin && form.isRemovingMargin)
            ? 0
            : Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)
        }
        notional={form.state.notional}
        position={position}
        transactionId={transactionId}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        onBack={handleGoBack}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <>
      {position ? (
        <MintBurnCurrentPosition
          fixedRateLower={position?.fixedRateLower.toNumber()}
          fixedRateUpper={position?.fixedRateUpper.toNumber()}
          formMode={form.mode}
          margin={position?.margin}
          notional={position?.notional}
          underlyingTokenName={position.amm.underlyingToken.name || ''}
          onPortfolio={handleComplete}
        />
      ) : (
        <FormPanel noBackground />
      )}
      <MintBurnForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.totalBalance}
        currentPositionMarginRequirement={form.currentPositionMarginRequirement}
        endDate={targetAmm.endDateTime}
        errors={form.errors}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
        formState={form.state}
        gaButtonId={getPoolButtonId(
          form.state.marginAction.toString(),
          form.state.liquidityAction.toString(),
          '',
          agent,
          isBorrowing(targetAmm.rateOracle.protocolId),
          targetAmm.protocol,
        )}
        hintState={form.hintState}
        isFormValid={form.isValid && !form.mintMinimumMarginRequirement.errorMessage}
        isTradeVierified={form.isTradeVerified}
        mode={form.mode}
        protocol={targetAmm.protocol}
        startDate={targetAmm.startDateTime}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.mintMinimumMarginRequirement.errorMessage}
        underlyingTokenName={targetAmm.underlyingToken.name}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        onCancel={onReset}
        onChangeFixedHigh={handleSetFixedHigh}
        onChangeFixedLow={handleSetFixedLow}
        onChangeLiquidityAction={form.setLiquidityAction}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onSubmit={handleSubmit}
      />
      <MintBurnInfo
        balance={form.balance}
        formState={form.state}
        mintMinimumMarginRequirement={form.mintMinimumMarginRequirement.result}
        mintMinimumMarginRequirementLoading={form.mintMinimumMarginRequirement.loading}
        mode={form.mode}
        underlyingTokenName={targetAmm.underlyingToken.name}
      />
    </>
  );
};
