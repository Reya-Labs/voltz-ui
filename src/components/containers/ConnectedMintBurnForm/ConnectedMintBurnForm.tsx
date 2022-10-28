import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import {
  MintBurnFormActions,
  MintBurnFormModes,
  useAMMContext,
  useAMMsContext,
  useMintBurnForm,
  usePositionContext,
} from '@contexts';
import {
  FormPanel,
  MintBurnCurrentPosition,
  MintBurnForm,
  MintBurnInfo,
  PendingTransaction,
} from '@components/interface';
import { updateFixedRate } from './utilities';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';
import { AugmentedAMM, getPoolButtonId, setPageTitle } from '@utilities';
import { isUndefined } from 'lodash';

export type ConnectedMintBurnFormProps = {
  onReset: () => void;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  onReset,
}) => {
  const { amm: targetAmm } = useAMMContext();
  const { amm: positionAmm } = usePositionContext();
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const form = useMintBurnForm();
  const navigate = useNavigate();
  const { position } = usePositionContext();

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const { fixedApr, variableApy } = useAMMsContext();
  const {
    result: resultFixedApr,
    loading: loadingFixedApr,
    call: callFixedApr,
  } = fixedApr(targetAmm);
  const {
    result: resultVariableApy,
    loading: loadingVariableApy,
    call: callVariableApy,
  } = variableApy(targetAmm);

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
      return actions.rolloverMintAction(positionAmm as AugmentedAMM, {
        ...transaction,
        ammId: (positionAmm as AugmentedAMM).id,
        margin: targetAmm.isETH ? 0 : Math.abs(form.state.margin as number),
        marginEth: targetAmm.isETH ? Math.abs(form.state.margin as number) : undefined,
        newMarginEngine: targetAmm.marginEngineAddress,
        oldFixedHigh: (position as Position).fixedRateUpper.toNumber(),
        oldFixedLow: (position as Position).fixedRateLower.toNumber(),
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
    navigate(`/${routes.LP_FARM}`);
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
        position={position}
        isEditingMargin={form.mode === MintBurnFormModes.EDIT_MARGIN}
        liquidityAction={form.state.liquidityAction}
        isRollover={form.mode === MintBurnFormModes.ROLLOVER}
        transactionId={transactionId}
        onComplete={handleComplete}
        notional={form.state.notional}
        margin={
          isUndefined(form.state.margin && form.isRemovingMargin)
            ? 0
            : Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1)
        }
        onBack={handleGoBack}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
      />
    );
  }

  return (
    <>
      {position ? (
        <MintBurnCurrentPosition
          formMode={form.mode}
          onPortfolio={handleComplete}
          position={position}
        />
      ) : (
        <FormPanel noBackground />
      )}
      <MintBurnForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.totalBalance}
        endDate={targetAmm.endDateTime}
        errors={form.errors}
        formState={form.state}
        hintState={form.hintState}
        isFormValid={form.isValid && !form.minRequiredMargin.errorMessage}
        isTradeVierified={form.isTradeVerified}
        mode={form.mode}
        onCancel={onReset}
        onChangeFixedLow={handleSetFixedLow}
        onChangeFixedHigh={handleSetFixedHigh}
        onChangeLiquidityAction={form.setLiquidityAction}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onSubmit={handleSubmit}
        protocol={targetAmm.protocol}
        gaButtonId={getPoolButtonId(
          form.state.marginAction.toString(),
          form.state.liquidityAction.toString(),
          '',
          agent,
          targetAmm,
        )}
        startDate={targetAmm.startDateTime}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.minRequiredMargin.errorMessage}
        underlyingTokenName={targetAmm.underlyingToken.name}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
      />
      <MintBurnInfo
        balance={form.balance}
        formState={form.state}
        minRequiredMargin={form.minRequiredMargin.result}
        minRequiredMarginLoading={form.minRequiredMargin.loading}
        mode={form.mode}
        underlyingTokenName={targetAmm.underlyingToken.name}
      />
    </>
  );
};

export default ConnectedMintBurnForm;
