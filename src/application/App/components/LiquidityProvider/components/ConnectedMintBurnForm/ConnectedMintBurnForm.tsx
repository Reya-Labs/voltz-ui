import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';

import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { MintBurnFormLiquidityAction, MintBurnFormMarginAction, useAgent, useDispatch, useMintBurnForm, useSelector } from '@hooks';
import { AMMProvider } from '@components/contexts';
import { MintBurnForm, PendingTransaction } from '@components/interface';
import { updateFixedRate } from './utilities';
import { isUndefined } from 'lodash';

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
  isEditingMargin,
  isEditingLiquidity,
  position
}) => {
  const { agent } = useAgent();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const defaultValues = {
    fixedLow: position ? parseFloat(position.fixedRateLower.toFixed() ) : undefined,
    fixedHigh: position ? parseFloat(position.fixedRateUpper.toFixed() ) : undefined
  }
  const form = useMintBurnForm(defaultValues);

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const isBurningLiquidity = (isEditingLiquidity && form.state.liquidityAction === MintBurnFormLiquidityAction.BURN);
  const isRemovingMargin = (isEditingMargin && form.state.marginAction === MintBurnFormMarginAction.REMOVE);

  const handleSetFixedHigh = useCallback(
    updateFixedRate({ amm, fixedRate: form.state.fixedHigh, setFixedRate: form.setFixedHigh }),
    [amm, form.state.fixedHigh, form.setFixedHigh],
  );

  const handleSetFixedLow = useCallback(
    updateFixedRate({ amm, fixedRate: form.state.fixedLow, setFixedRate: form.setFixedLow }),
    [amm, form.state.fixedLow, form.setFixedLow],
  );

  const handleSubmit = () => {
    if (isUndefined(form.state.fixedHigh)) return;
    if (isUndefined(form.state.fixedLow)) return;
    if (isUndefined(form.state.margin)) return;
    if (isUndefined(form.state.notional)) return;

    const transaction = { 
      ammId: amm.id, 
      agent,
      fixedLow: form.state.fixedLow,
      fixedHigh: form.state.fixedHigh,
      margin: Math.abs(form.state.margin) * (isRemovingMargin ? -1 : 1),
      notional: Math.abs(form.state.notional) * (isBurningLiquidity ? -1 : 1),
    };

    let action;
    if (isEditingMargin) {
      action = actions.updatePositionMarginAction(amm, transaction);
    } 
    else if (!isEditingLiquidity || form.state.liquidityAction === MintBurnFormLiquidityAction.ADD) {
      action = actions.mintAction(amm, transaction);
    } 
    else {
      action = actions.burnAction(amm, transaction);
    } 
      
    setTransactionId(action.payload.transaction.id);
    dispatch(action);
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_FARM}`);
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
        isEditingLiquidity={isEditingLiquidity}
        isEditingMargin={isEditingMargin}
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
      />
    </AMMProvider>
  );
};

export default ConnectedMintBurnForm;
