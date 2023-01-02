import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Agents } from '../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { useBorrowAMMContext } from '../../../contexts/BorrowAMMContext/BorrowAMMContext';
import { useBorrowFormContext } from '../../../contexts/BorrowFormContext/BorrowFormContext';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { routes } from '../../../routes/paths';
import { actions, selectors } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isBorrowing } from '../../../utilities/isBorrowing';
import { BorrowForm } from '../../interface/BorrowForm/BorrowForm';
import { FormPanel } from '../../interface/FormPanel/FormPanel';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { SwapFormActions, SwapFormModes } from '../../interface/SwapForm/types';
import { SwapInfo } from '../../interface/SwapInfo/SwapInfo';

export type ConnectedBorrowFormProps = {
  onReset: () => void;
};

export const ConnectedBorrowForm: React.FunctionComponent<ConnectedBorrowFormProps> = ({
  onReset,
}) => {
  const { amm: borrowAmm } = useBorrowAMMContext();
  const { amm } = useAMMContext();
  const form = useBorrowFormContext();
  const { position } = usePositionContext();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useAppSelector(selectors.transactionSelector)(transactionId);

  const { fixedApr, variableApy } = useAMMContext();
  const { result: resultFixedApr, call: callFixedApr } = fixedApr;
  const { result: resultVariableApy, call: callVariableApy } = variableApy;

  useEffect(() => {
    callFixedApr();
  }, [callFixedApr]);

  useEffect(() => {
    callVariableApy();
  }, [callVariableApy]);

  const protocol = () => {
    if (isBorrowing(amm.rateOracle.protocolId)) {
      return `borrow_${amm.protocol}`;
    }
    return amm.protocol;
  };

  const getReduxAction = () => {
    const transaction = {
      agent: Agents.VARIABLE_TRADER,
      ammId: amm.id,
      margin: Number(Math.abs(form.margin)),
      notional: Number(form.selectedFixedDebt),
      partialCollateralization: true,
      fixedLow: 0.001,
      fixedHigh: 990,
      fullyCollateralisedVTSwap: true,
    };

    return actions.swapAction(amm, transaction);
  };

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.BORROW_POS}`);
  };

  const handleGoBack = () => {
    form.setNotional(0);
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  };

  const handleSubmit = () => {
    if (!form.isValid) return;

    if (!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
      void form.tokenApprovals.approveUnderlyingTokenForPeriphery();
      return;
    }

    const action = getReduxAction();
    if (action) {
      setTransactionId(action.payload.transaction.id);
      dispatch(action);
    }
  };

  if (!borrowAmm || !amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction
        amm={amm}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
        isEditingMargin={false}
        isRollover={false}
        margin={form.margin}
        notional={form.selectedFixedDebt}
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
      <FormPanel noBackground />
      <BorrowForm
        approvalsNeeded={form.approvalsNeeded}
        balance={form.balance}
        endDate={amm.endDateTime}
        errors={form.errors}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
        hintState={form.hintState}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        margin={form.margin}
        protocol={amm.protocol}
        selectedFixedDebt={form.selectedFixedDebt}
        selectedFixedDebtPercentage={form.selectedFixedDebtPercentage}
        selectedVariableDebt={form.selectedVariableDebt}
        selectedVariableDebtPercentage={form.selectedVariableDebtPercentage}
        submitButtonState={form.submitButtonState}
        swapSummaryLoading={form.borrowInfo.loading}
        tokenApprovals={form.tokenApprovals}
        tradeInfoErrorMessage={form.borrowInfo.errorMessage}
        underlyingTokenName={amm.underlyingToken.name}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        variableDebt={form.variableDebt}
        onCancel={onReset}
        onChangeNotional={form.setNotional}
        onSubmit={handleSubmit}
      />
      <SwapInfo
        balance={form.selectedFixedDebt}
        formAction={SwapFormActions.SWAP}
        mode={SwapFormModes.FIX_BORROW}
        positionMargin={form.margin}
        protocol={protocol()}
        swapSummary={form.borrowInfo.data}
        swapSummaryLoading={form.borrowInfo.loading}
        underlyingTokenName={amm.underlyingToken.name}
        warningText={form.warningText}
      />
    </>
  );
};
