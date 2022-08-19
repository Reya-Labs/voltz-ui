import { useAMMs, useDispatch, useSelector } from '@hooks';
import { routes } from '@routes';
import { useState } from 'react';
import { actions, selectors } from '@store';

import { useNavigate } from 'react-router-dom';
import { BorrowForm, PendingTransaction, SwapFormActions, SwapFormModes, SwapInfo } from '@components/interface';
import { useAMMContext, useBorrowAMMContext, useBorrowFormContext, Agents } from '@contexts';


export type ConnectedBorrowFormProps = {
  onReset: () => void;
};

const ConnectedBorrowForm: React.FunctionComponent<ConnectedBorrowFormProps> = ({ onReset }) => {
  const { amm: borrowAmm } = useBorrowAMMContext();
  const { amm } = useAMMContext();
  const form = useBorrowFormContext();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const getReduxAction = () => {
    const transaction = { 
      agent: Agents.VARIABLE_TRADER,
      ammId: amm.id,
      margin: Number(Math.abs(form.margin)),
      notional: Number((form.selectedFixedDebt as number)),
      partialCollateralization: true,
      fixedLow: 0.001,
      fixedHigh: 990
    };

    return actions.swapAction(amm, transaction);
  }

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.BORROW_POS}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
    form.setNotional(0);
  }

  const handleSubmit = () => {
    if (!form.isValid) return;

    if(!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
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
        isEditingMargin={false}
        isRollover={false}
        transactionId={transactionId}
        onComplete={handleComplete}
        notional={form.selectedFixedDebt as number}
        margin={form.margin}
        onBack={handleGoBack}
      />
    );
  }

  return (
    <>
      <BorrowForm
        protocol={amm.protocol}
        startDate={amm.startDateTime}
        endDate={amm.endDateTime}
        errors={form.errors}
        notional={0}
        onChangeNotional={form.setNotional}
        underlyingTokenName={amm.underlyingToken.name}
        approvalsNeeded={form.approvalsNeeded}
        isFormValid={form.isValid}
        isTradeVerified={form.isTradeVerified}
        onCancel={handleGoBack}
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
      />
      {/* <SwapInfo
      balance={form.selectedFixedDebt}
        formAction={SwapFormActions.SWAP} 
        minRequiredMargin={form.margin}
        mode={SwapFormModes.NEW_POSITION}
        positionMargin={form.margin}
        protocol={amm.protocol}
        swapSummary={form.borrowInfo.data}
        swapSummaryLoading={form.borrowInfo.loading}
        underlyingTokenName={amm.underlyingToken.name}
      /> */}
    </>
  )
}

export default ConnectedBorrowForm;