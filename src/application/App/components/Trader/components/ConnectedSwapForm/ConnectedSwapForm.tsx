import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { AugmentedAMM } from '@utilities';
import { AMMProvider } from '@components/contexts';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import {
  SwapForm,
  SwapFormProps,
  HandleSubmitSwapFormArgs,
  PendingTransaction,
} from '@components/interface';

export type ConnectedSwapFormProps = {
  amm: AugmentedAMM;
  marginEditMode?: boolean;
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ amm, onReset, marginEditMode }) => {
  const { agent } = useAgent();
  const navigate = useNavigate();
  const [notional, setNotional] = useState<SwapFormProps['notional']>();
  const [margin, setMargin] = useState<SwapFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<SwapFormProps['partialCollateralization']>();

  const [addOrRemoveMargin, setAddOrRemoveMargin] =
    useState<SwapFormProps['addOrRemoveMargin']>();

  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId); // contains a failureMessage attribute that will contain whatever came out from the sdk
  // activeTransaction.failureMessage = "No margin", could also be a big horrible object, needs a little more work to parse it correctly

  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (args: HandleSubmitSwapFormArgs) => {
      const transaction = { ...args, ammId: amm.id, agent };
    
      if (marginEditMode) {
        const updatePositionMargin = actions.updatePositionMarginAction(amm, transaction);
        setTransactionId(updatePositionMargin.payload.transaction.id);
        dispatch(updatePositionMargin);
      } else {
        const swap = actions.swapAction(amm, transaction);
        setTransactionId(swap.payload.transaction.id);
        dispatch(swap);
      }

    },
    [setTransactionId, dispatch, agent, amm.id],
  );
  const handleComplete = () => {
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  if (!amm) {
    return null;
  }

  if (activeTransaction) {
    return (
      <PendingTransaction amm={amm} transactionId={transactionId} onComplete={handleComplete} />
    );
  }

  return (
    <AMMProvider amm={amm}>
      <SwapForm
        protocol={amm.protocol}
        underlyingTokenName={amm.underlyingToken.name}
        startDate={amm.startDateTime}
        endDate={amm.endDateTime}
        notional={notional || 0}
        onChangeNotional={setNotional}
        margin={margin || 0}
        partialCollateralization={partialCollateralization}
        addOrRemoveMargin={addOrRemoveMargin}
        marginEditMode={marginEditMode}
        onChangePartialCollateralization={setPartialCollateralization}
        onChangeMargin={setMargin}
        onAddOrRemoveMargin={setAddOrRemoveMargin}
        onSubmit={handleSubmit}
        onCancel={onReset}
      />
    </AMMProvider>
  );
};

export default ConnectedSwapForm;
