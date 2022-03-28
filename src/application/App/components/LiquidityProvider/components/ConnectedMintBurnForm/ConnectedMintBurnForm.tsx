import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { actions, selectors } from '@store';
import { useAgent, useDispatch, useSelector } from '@hooks';
import { AMMProvider } from '@components/contexts';
import {
  MintBurnForm,
  MintBurnFormProps,
  HandleSubmitMintBurnFormArgs,
  PendingTransaction,
} from '@components/interface';
import { updateFixedRate } from './utilities';

export type ConnectedMintBurnFormProps = {
  amm: AugmentedAMM;
  onReset: () => void;
};

const ConnectedMintBurnForm: React.FunctionComponent<ConnectedMintBurnFormProps> = ({
  amm,
  onReset,
}) => {
  const { agent } = useAgent();
  const navigate = useNavigate();
  const [fixedLow, setFixedLow] = useState<MintBurnFormProps['fixedLow']>();
  const handleSetFixedLow = useCallback(
    updateFixedRate({ amm, fixedRate: fixedLow, setFixedRate: setFixedLow }),
    [amm, fixedLow, setFixedLow],
  );

  const [fixedHigh, setFixedHigh] = useState<MintBurnFormProps['fixedHigh']>();
  const handleSetFixedHigh = useCallback(
    updateFixedRate({ amm, fixedRate: fixedHigh, setFixedRate: setFixedHigh }),
    [amm, fixedHigh, setFixedHigh],
  );
  const [notional, setNotional] = useState<MintBurnFormProps['notional']>();
  const [margin, setMargin] = useState<MintBurnFormProps['margin']>();
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(transactionId);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (args: HandleSubmitMintBurnFormArgs) => {
      const transaction = { ...args, ammId: amm.id, agent };
      const mint = actions.mintAction(amm, transaction);

      setTransactionId(mint.payload.transaction.id);
      dispatch(mint);
    },
    [setTransactionId, dispatch, agent, amm.id],
  );
  const handleComplete = () => {
    onReset();
    navigate(`/${routes.LP_FARM}`);
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
      <MintBurnForm
        protocol={amm.protocol}
        fixedApr={amm.fixedApr}
        startDate={amm.startDateTime}
        endDate={amm.endDateTime}
        fixedLow={fixedLow}
        onChangeFixedLow={handleSetFixedLow}
        fixedHigh={fixedHigh}
        onChangeFixedHigh={handleSetFixedHigh}
        notional={notional}
        onChangeNotional={setNotional}
        margin={margin}
        onChangeMargin={setMargin}
        onSubmit={handleSubmit}
        onCancel={onReset}
      />
    </AMMProvider>
  );
};

export default ConnectedMintBurnForm;
