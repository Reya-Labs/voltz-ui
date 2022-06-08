import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { MintBurnFormLiquidityAction, MintBurnFormMarginAction, useAgent, useBalance, useDispatch, useMintBurnForm, useSelector, useTokenApproval } from '@hooks';
import { MintBurnForm, MintBurnFormModes, PendingTransaction } from '@components/interface';
import { updateFixedRate } from './utilities';
import { getFormAction, getSubmitAction, getSubmitButtonHint, getSubmitButtonText } from './services';

export type ConnectedMintBurnFormProps = {
  amm: AugmentedAMM;
  mode?: MintBurnFormModes;
  onReset: () => void;
  position?: Position;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  amm,
  onReset,
  mode = MintBurnFormModes.NEW_POSITION,
  position
}) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const balance = useBalance(amm);
  const defaultValues = {
    fixedLow: position ? parseFloat(position.fixedRateLower.toFixed() ) : undefined,
    fixedHigh: position ? parseFloat(position.fixedRateUpper.toFixed() ) : undefined
  }
  const form = useMintBurnForm(amm, mode, defaultValues);
  const tokenApprovals = useTokenApproval(amm, true);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const formAction = getFormAction(mode, form.state.liquidityAction);
  const isBurningLiquidity = mode === MintBurnFormModes.EDIT_LIQUIDITY && form.state.liquidityAction === MintBurnFormLiquidityAction.BURN;
  const isRemovingMargin = mode === MintBurnFormModes.EDIT_MARGIN && form.state.marginAction === MintBurnFormMarginAction.REMOVE;
  const submitButtonHint = getSubmitButtonHint(amm, mode, form, tokenApprovals, form.minRequiredMargin.errorMessage);
  const submitButtonText = getSubmitButtonText(mode, tokenApprovals, amm, form.state);

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_FARM}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  const handleSetFixedHigh = useCallback(
    updateFixedRate({ amm, fixedRate: form.state.fixedHigh, setFixedRate: form.setFixedHigh }),
    [amm, form.state.fixedHigh, form.setFixedHigh],
  );

  const handleSetFixedLow = useCallback(
    updateFixedRate({ amm, fixedRate: form.state.fixedLow, setFixedRate: form.setFixedLow }),
    [amm, form.state.fixedLow, form.setFixedLow],
  );

  const handleSubmit = () => {
    if (!form.isValid) return;

    if(!isBurningLiquidity && !isRemovingMargin) {
      if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const action = getSubmitAction(amm, formAction, form.state, agent, mode);
    setTransactionId(action.payload.transaction.id);
    dispatch(action);
  };

  if (!amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction 
        amm={amm} 
        isEditingMargin={mode === MintBurnFormModes.EDIT_MARGIN} 
        liquidityAction={form.state.liquidityAction} 
        transactionId={transactionId} 
        onComplete={handleComplete}
        notional={form.state.notional}
        margin={Math.abs(form.state.margin as number) * (isRemovingMargin ? -1 : 1) }
        onBack={handleGoBack} 
      />
    );
  }

  return (
    <MintBurnForm
      balance={balance ? amm.descale(balance) : undefined}
      endDate={amm.endDateTime}
      formState={form.state}
      errors={form.errors}
      mode={mode}
      isFormValid={form.isValid && !form.minRequiredMargin.errorMessage}
      minRequiredMargin={form.minRequiredMargin.result}
      minRequiredMarginLoading={form.minRequiredMargin.loading}
      onCancel={onReset}
      onChangeFixedLow={handleSetFixedLow}
      onChangeFixedHigh={handleSetFixedHigh}
      onChangeLiquidityAction={form.setLiquidityAction}
      onChangeMargin={form.setMargin}
      onChangeMarginAction={form.setMarginAction} 
      onChangeNotional={form.setNotional}
      onSubmit={handleSubmit}
      protocol={amm.protocol}
      startDate={amm.startDateTime}
      submitButtonHint={submitButtonHint}
      submitButtonText={submitButtonText}
      tokenApprovals={tokenApprovals}
      underlyingTokenName={amm.underlyingToken.name}
    />
  );
};

export default ConnectedMintBurnForm;
