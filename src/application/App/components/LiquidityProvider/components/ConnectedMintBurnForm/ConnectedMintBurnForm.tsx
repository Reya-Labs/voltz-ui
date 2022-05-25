import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useMintBurnForm, useSelector, useTokenApproval } from '@hooks';
import { AMMProvider } from '@components/contexts';
import { MintBurnForm, PendingTransaction } from '@components/interface';
import { updateFixedRate } from './utilities';
import { getFormAction, getSubmitAction, getSubmitButtonHint, getSubmitButtonText } from './services';

export type ConnectedMintBurnFormProps = {
  amm: AugmentedAMM;
  isEditingMargin?: boolean;
  isEditingLiquidity?: boolean;
  onReset: () => void;
  position?: Position;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  amm,
  onReset,
  isEditingMargin = false,
  isEditingLiquidity = false,
  position
}) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const defaultValues = {
    fixedLow: position ? parseFloat(position.fixedRateLower.toFixed() ) : undefined,
    fixedHigh: position ? parseFloat(position.fixedRateUpper.toFixed() ) : undefined
  }
  const form = useMintBurnForm(amm, isEditingMargin, isEditingLiquidity, defaultValues);
  const tokenApprovals = useTokenApproval(amm, true);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const formAction = getFormAction(isEditingMargin, isEditingLiquidity, form.state.liquidityAction);
  const submitButtonHint = getSubmitButtonHint(amm, form.errors, form.isValid, tokenApprovals);
  const submitButtonText = getSubmitButtonText(isEditingLiquidity, tokenApprovals, amm, form.state.liquidityAction);

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
    if(!form.isValid) return;

    if(!tokenApprovals.underlyingTokenApprovedForPeriphery) {
      tokenApprovals.approveUnderlyingTokenForPeriphery();
      return;
    }

    const action = getSubmitAction(amm, formAction, form.state, agent, isEditingLiquidity, isEditingMargin);
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
        isEditingMargin={isEditingMargin} 
        liquidityAction={form.state.liquidityAction} 
        transactionId={transactionId} 
        onComplete={handleComplete} 
        onBack={handleGoBack} 
      />
    );
  }

  return (
    <AMMProvider amm={amm}>
      <MintBurnForm
        endDate={amm.endDateTime}
        formState={form.state}
        errors={form.errors}
        isEditingLiquidity={isEditingLiquidity}
        isEditingMargin={isEditingMargin}
        isFormValid={form.isValid}
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
      />
    </AMMProvider>
  );
};

export default ConnectedMintBurnForm;
