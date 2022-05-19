import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { AugmentedAMM } from '@utilities';
import { Agents, AMMProvider } from '@components/contexts';
import { actions, selectors } from '@store';
import { MintBurnFormMarginAction, useAgent, useDispatch, useSelector } from '@hooks';
import { SwapForm, PendingTransaction } from '@components/interface';
import useSwapForm from 'src/hooks/useSwapForm';
import { isUndefined } from 'lodash';

export type ConnectedSwapFormProps = {
  amm: AugmentedAMM;
  isEditingMargin?: boolean;
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ 
  amm,
  onReset, 
  isEditingMargin,
}) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = {};
  const form = useSwapForm(defaultValues);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk

  const isRemovingMargin = isEditingMargin && form.state.marginAction === MintBurnFormMarginAction.REMOVE;

  const handleSubmit = () => {
    if (isUndefined(form.state.notional)) return;
    if (isUndefined(form.state.margin)) return;
    if (isUndefined(form.state.partialCollateralization)) return;

    const transaction = { 
      agent,
      ammId: amm.id,
      margin: Math.abs(form.state.margin) * (isRemovingMargin ? -1 : 1),
      notional: form.state.notional,
      partialCollateralization: form.state.partialCollateralization
    };
  
    let action;
    if (isEditingMargin) {
      action = actions.updatePositionMarginAction(amm, transaction);
    } 
    else if (form.state.partialCollateralization) {
      action = actions.swapAction(amm, transaction);
    } 
    else if (agent === Agents.FIXED_TRADER) {
      action = actions.fcmSwapAction(amm, transaction);
    } else {
      action = actions.fcmUnwindAction(amm, transaction); 
    }

    setTransactionId(action.payload.transaction.id)
    dispatch(action)
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }

  if (!amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction 
        amm={amm} 
        isEditingMargin={isEditingMargin} 
        transactionId={transactionId} 
        onComplete={handleComplete} 
        onBack={handleGoBack} 
      />
    );
  }

  return (
    <AMMProvider amm={amm}>
      <SwapForm
        formState={form.state}
        endDate={amm.endDateTime}
        isEditingMargin={isEditingMargin}
        onCancel={onReset}
        onChangeMargin={form.setMargin}
        onChangeMarginAction={form.setMarginAction}
        onChangeNotional={form.setNotional}
        onChangePartialCollateralization={form.setPartialCollateralization}
        onSubmit={handleSubmit}
        protocol={amm.protocol}
        startDate={amm.startDateTime}
        underlyingTokenName={amm.underlyingToken.name}
      />
    </AMMProvider>
  );
};

export default ConnectedSwapForm;
