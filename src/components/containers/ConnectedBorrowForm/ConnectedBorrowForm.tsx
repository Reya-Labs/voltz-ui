import { useAMMs, useDispatch, useSelector } from '@hooks';
import { routes } from '@routes';
import { useState } from 'react';
import { actions, selectors } from '@store';

import { useNavigate } from 'react-router-dom';


export type ConnectedBorrowFormProps = {
    onReset: () => void;
  };

const ConnectedBorrowForm: React.FunctionComponent<ConnectedBorrowFormProps> = ({ onReset }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // TODO: this is static, need to use state
    const form = {

    }

    // TODO: need to get rid of this and get the AMM from context
    const { amms, loading, error } = useAMMs(); 

    const handleComplete = () => {
        onReset();
        navigate(`/${routes.PORTFOLIO}`);
    };

    const handleGoBack = () => {
        const action = actions.closeTransaction(transactionId as string);
        dispatch(action);
    }

    const [transactionId, setTransactionId] = useState<string | undefined>();
    const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);

    if (!amms || loading || error) {
      return null;
    }

    const getReduxAction = () => {
        return actions.borrowAction(amms[0], 10, {});
      }

      const handleSubmit = () => {
        if(!form.isValid) return;
    
        if(!form.isRemovingMargin) {
          if (form.action === SwapFormActions.FCM_SWAP || form.action === SwapFormActions.FCM_UNWIND) {
            if(!form.tokenApprovals.FCMApproved) {
              void form.tokenApprovals.approveFCM();
              return;
            } else if(!form.tokenApprovals.yieldBearingTokenApprovedForFCM) {
              void form.tokenApprovals.approveYieldBearingTokenForFCM();
              return;
            } else if(!form.tokenApprovals.underlyingTokenApprovedForFCM) {
              void form.tokenApprovals.approveUnderlyingTokenForFCM();
              return;
            }
          } else {
            if(!form.tokenApprovals.underlyingTokenApprovedForPeriphery) {
              void form.tokenApprovals.approveUnderlyingTokenForPeriphery();
              return;
            }
          }
        }
    
        const action = getReduxAction();
        if(action) {
          setTransactionId(action.payload.transaction.id);
          dispatch(action);
        }
      };
}