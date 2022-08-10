import { useAMMs, useDispatch, useSelector } from '@hooks';
import { routes } from '@routes';
import { useState } from 'react';
import { actions, selectors } from '@store';

import { useNavigate } from 'react-router-dom';
import { BorrowForm } from 'src/components/interface/BorrowForm';


export type ConnectedBorrowFormProps = {
  onReset: () => void;
};

const ConnectedBorrowForm: React.FunctionComponent<ConnectedBorrowFormProps> = ({ onReset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

  const { amms, loading, error } = useAMMs();

  if (!amms || loading || error) {
    return null;
  }

   // TODO: need to get rid of this and get the AMM from context
  const targetAmm = amms[0];

  // TODO: this is static, need to use state
  const form = {
    isValid: true,
    notional: 100,
    tokenApprovals: {
      approved: true,
      approve: async () => { }
    }
  }

  const handleComplete = () => {
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  const handleGoBack = () => {
    const action = actions.closeTransaction(transactionId as string);
    dispatch(action);
  }


  const getReduxAction = () => {
    return actions.borrowAction(targetAmm, form.notional, {});
  }

  const handleSubmit = () => {
    if (!form.isValid) return;

    if (!form.tokenApprovals.approved) {
      void form.tokenApprovals.approve();
      return;
    }

    const action = getReduxAction();
    if (action) {
      setTransactionId(action.payload.transaction.id);
      dispatch(action);
    }
  };

  if (activeTransaction) {
    // need to create Pending Transaction screen
    return null;
  }

  return (
    <BorrowForm 
      protocol={targetAmm.protocol}
      startDate={targetAmm.startDateTime}
      endDate={targetAmm.endDateTime}
      errors={{}}
      notional={form.notional}
      onChangeNotional={() => {}}
      underlyingTokenName={targetAmm.underlyingToken.name}
      approvalsNeeded={false}
      isFormValid={false}
      isTradeVerified={true}
      onCancel={handleGoBack}
      onSubmit={handleSubmit}
      tokenApprovals={{
        checkingApprovals: false,
        approving: false
      }}
    />
  )
}

export default ConnectedBorrowForm;