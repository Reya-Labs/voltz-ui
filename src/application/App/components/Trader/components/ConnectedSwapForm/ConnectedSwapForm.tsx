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
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({ amm, onReset }) => {
  const { agent } = useAgent();
  const navigate = useNavigate();
  const [notional, setNotional] = useState<SwapFormProps['notional']>();
  const [margin, setMargin] = useState<SwapFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<SwapFormProps['partialCollateralization']>();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (args: HandleSubmitSwapFormArgs) => {
      const transaction = { ...args, ammId: amm.id, agent };
      const swap = actions.swapAction(amm, transaction);

      setTransactionId(swap.payload.transaction.id);
      dispatch(swap);
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
        fixedApr={amm.fixedApr}
        startDate={amm.startDateTime}
        endDate={amm.endDateTime}
        notional={notional}
        onChangeNotional={setNotional}
        margin={margin}
        partialCollateralization={partialCollateralization}
        onChangePartialCollateralization={setPartialCollateralization}
        onChangeMargin={setMargin}
        onSubmit={handleSubmit}
        onCancel={onReset}
      />
    </AMMProvider>
  );
};

export default ConnectedSwapForm;
