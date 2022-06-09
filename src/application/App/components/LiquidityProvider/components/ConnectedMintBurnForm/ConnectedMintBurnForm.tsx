import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector, useTokenApproval } from '@hooks';
import { useMintBurnForm } from '@components/contexts';
import { MintBurnForm, MintBurnFormModes, PendingTransaction } from '@components/interface';
import { updateFixedRate } from './utilities';
import { getFormAction, getSubmitAction, getSubmitButtonHint, getSubmitButtonText } from './services';

export type ConnectedMintBurnFormProps = {
  onReset: () => void;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({ onReset }) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const form = useMintBurnForm();
  const tokenApprovals = useTokenApproval(form.amm, true);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const formAction = getFormAction(form.mode, form.state.liquidityAction);
  const submitButtonHint = getSubmitButtonHint(form.amm, form.mode, form, tokenApprovals, form.minRequiredMargin.errorMessage);
  const submitButtonText = getSubmitButtonText(form.mode, tokenApprovals, form.amm, form.state);

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
      if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
        tokenApprovals.approveUnderlyingTokenForPeriphery();
        return;
      }
    }

    const action = getSubmitAction(form.amm, formAction, form.state, agent, form.mode);
    setTransactionId(action.payload.transaction.id);
    dispatch(action);
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

  return (
    <MintBurnForm
      balance={form.balance ? form.amm.descale(form.balance) : undefined}
      endDate={form.amm.endDateTime}
      formState={form.state}
      errors={form.errors}
      mode={form.mode}
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
      protocol={form.amm.protocol}
      startDate={form.amm.startDateTime}
      submitButtonHint={submitButtonHint}
      submitButtonText={submitButtonText}
      tokenApprovals={tokenApprovals}
      underlyingTokenName={form.amm.underlyingToken.name}
    />
  );
};

export default ConnectedMintBurnForm;
