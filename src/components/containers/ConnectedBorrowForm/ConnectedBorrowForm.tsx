import { routes } from '../../../routes/paths';
import React, { useEffect, useState } from 'react';
import { actions, selectors } from '../../../store';

import { useNavigate } from 'react-router-dom';
import { BorrowForm } from '../../interface/BorrowForm/BorrowForm';
import { PendingTransaction } from '../../interface/PendingTransaction/PendingTransaction';
import { isBorrowing } from '../../../utilities/isBorrowing';
import { FormPanel } from '../../interface/FormPanel/FormPanel';
import { SwapInfo } from '../../interface/SwapInfo';
import { SwapFormActions, SwapFormModes } from '../../interface/SwapForm';
import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { useBorrowAMMContext } from '../../../contexts/BorrowAMMContext/BorrowAMMContext';
import { Agents } from '../../../contexts/AgentContext/types';
import { useAMMContext } from '../../../contexts/AMMContext/AMMContext';
import { useBorrowFormContext } from '../../../contexts/BorrowFormContext/BorrowFormContext';
import { useDispatch } from '../../../hooks/useDispatch';
import { useSelector } from '../../../hooks/useSelector';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

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
        position={position}
        isEditingMargin={false}
        isRollover={false}
        transactionId={transactionId}
        onComplete={handleComplete}
        notional={form.selectedFixedDebt}
        margin={form.margin}
        onBack={handleGoBack}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
      />
    );
  }

  return (
    <>
      <FormPanel noBackground />
      <BorrowForm
        protocol={amm.protocol}
        endDate={amm.endDateTime}
        errors={form.errors}
        onChangeNotional={form.setNotional}
        underlyingTokenName={amm.underlyingToken.name}
        approvalsNeeded={form.approvalsNeeded}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        onCancel={onReset}
        onSubmit={handleSubmit}
        tokenApprovals={form.tokenApprovals}
        variableDebt={form.variableDebt}
        selectedFixedDebt={form.selectedFixedDebt}
        selectedFixedDebtPercentage={form.selectedFixedDebtPercentage}
        selectedVariableDebt={form.selectedVariableDebt}
        selectedVariableDebtPercentage={form.selectedVariableDebtPercentage}
        hintState={form.hintState}
        submitButtonState={form.submitButtonState}
        margin={form.margin}
        tradeInfoErrorMessage={form.borrowInfo.errorMessage}
        swapSummaryLoading={form.borrowInfo.loading}
        balance={form.balance}
        variableApy={typeof resultVariableApy === 'number' ? resultVariableApy : undefined}
        fixedApr={typeof resultFixedApr === 'number' ? resultFixedApr : undefined}
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
