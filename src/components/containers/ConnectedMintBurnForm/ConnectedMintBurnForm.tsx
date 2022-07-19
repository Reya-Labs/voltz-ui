import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { MintBurnFormActions, MintBurnFormModes, useMintBurnForm } from '@contexts';
import { Loading } from '@components/atomic';
import { FormPanel, MintBurnCurrentPosition, MintBurnForm, MintBurnInfo, PendingTransaction } from '@components/interface';
import { updateFixedRate } from './utilities';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

export type ConnectedMintBurnFormProps = {
  onReset: () => void;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const form = useMintBurnForm();
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const getSubmitReduxAction = () => {
    const transaction = { 
      ammId: form.amm.id, 
      agent,
      fixedLow: form.state.fixedLow,
      fixedHigh: form.state.fixedHigh,
      margin: Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1),
      notional: Math.abs(form.state.notional as number) * (form.isRemovingLiquidity ? -1 : 1),
    };

    if(form.mode === MintBurnFormModes.ROLLOVER) {
      return actions.rolloverAction(form.amm, { 
        ...transaction,
        margin: form.amm.isETH ? 0 : Math.abs(form.state.margin as number),
        marginEth: form.amm.isETH ? Math.abs(form.state.margin as number) : undefined,
        newMarginEngine: form.amm.marginEngineAddress,
        oldFixedHigh: (form.position as Position).fixedRateUpper.toNumber(),
        oldFixedLow: (form.position as Position).fixedRateLower.toNumber()
      });
    }
  
    switch(form.action) {
      case MintBurnFormActions.UPDATE:
        return actions.updatePositionMarginAction(form.amm, transaction);
      case MintBurnFormActions.MINT:
        return actions.mintAction(form.amm, transaction);
      case MintBurnFormActions.BURN:
        return actions.burnAction(form.amm, transaction);
    }
  }

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_FARM}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  const handleSetFixedHigh = useCallback(
    updateFixedRate({ amm: form.amm, fixedRate: form.state.fixedHigh, setFixedRate: form.setFixedHigh }),
    [form.amm, form.state.fixedHigh, form.setFixedHigh],
  );

  const handleSetFixedLow = useCallback(
    updateFixedRate({ amm: form.amm, fixedRate: form.state.fixedLow, setFixedRate: form.setFixedLow }),
    [form.amm, form.state.fixedLow, form.setFixedLow],
  );

  const handleSubmit = () => {
    if (!form.isValid) return;

    if(!form.isRemovingLiquidity && !form.isRemovingMargin) {
      if(!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
        form.tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const reduxAction = getSubmitReduxAction();
    if(reduxAction) {
      setTransactionId(reduxAction.payload.transaction.id);
      dispatch(reduxAction);
    }
  };

  if (!form.amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction 
        amm={form.amm} 
        isEditingMargin={form.mode === MintBurnFormModes.EDIT_MARGIN} 
        liquidityAction={form.state.liquidityAction} 
        transactionId={transactionId} 
        onComplete={handleComplete}
        notional={form.state.notional}
        margin={Math.abs(form.state.margin as number) * (form.isRemovingMargin ? -1 : 1) }
        onBack={handleGoBack} 
      />
    );
  }

  if(form.position && !form.positionInfo?.result) {
    return (
      <>
        <FormPanel noBackground />
        <FormPanel>
          <Loading sx={{ margin: '0 auto' }} />
        </FormPanel>
        <FormPanel noBackground />
      </>
    )
  }

  return (
    <>
      {form.position 
        ? <MintBurnCurrentPosition formMode={form.mode} onPortfolio={onReset} position={form.position} /> 
        : <FormPanel noBackground />
      }
      <MintBurnForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.totalBalance}
        endDate={form.amm.endDateTime}
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
        protocol={form.amm.protocol}
        startDate={form.amm.startDateTime}
        submitButtonState={form.submitButtonState}
        tokenApprovals={form.tokenApprovals}
        underlyingTokenName={form.amm.underlyingToken.name}
      />
      <MintBurnInfo
        balance={form.balance}
        formState={form.state}
        minRequiredMargin={form.minRequiredMargin.result}
        minRequiredMarginLoading={form.minRequiredMargin.loading}
        mode={form.mode}
        underlyingTokenName={form.amm.underlyingToken.name}
      />
    </>
  );
};

export default ConnectedMintBurnForm;
