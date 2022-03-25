import React, { useMemo, useState } from 'react';
import isNull from 'lodash/isNull';
import { useNavigate } from 'react-router-dom';
import { Position } from '@voltz/v1-sdk';

import { routes } from '@routes';
import { AMMProvider } from '@components/contexts';
import { useWallet, useAgent, AugmentedAMM } from '@hooks';
import { Agents } from '@components/contexts';
import {
  SwapForm,
  SwapFormProps,
  HandleSubmitSwapFormArgs,
  PendingTransaction,
} from '@components/interface';

export type ConnectedSwapFormProps = {
  amm: AugmentedAMM | null;
  position: Position | null;
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({
  amm: defaultAMM,
  position,
  onReset,
}) => {
  const { agent } = useAgent();
  const amm = useMemo(() => {
    if (!isNull(defaultAMM)) {
      return defaultAMM;
    }

    if (position) {
      return position.amm as AugmentedAMM;
    }

    return undefined;
  }, [defaultAMM, position]);
  const { account } = useWallet();
  const navigate = useNavigate();
  const [notional, setNotional] = useState<SwapFormProps['notional']>();
  const [margin, setMargin] = useState<SwapFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<SwapFormProps['partialCollateralization']>();
  const [submitting, setSubmitting] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const handleSubmit = async (args: HandleSubmitSwapFormArgs) => {
    setSubmitting(true);
    setTransactionPending(true);

    if (amm && account) {
      try {
        const result = await amm.swap({
          isFT: agent === Agents.FIXED_TRADER,
          recipient: account,
          fixedLow: 1, // todo: set values
          fixedHigh: 2,
          notional: args.notional || 1,
          margin: args.margin || 1,
        });
      } catch (swapError) {}
    }

    setTransactionPending(false);
  };
  const handleComplete = () => {
    setSubmitting(false);
    onReset();
    navigate(`/${routes.PORTFOLIO}`);
  };

  if (!amm) {
    return null;
  }

  if (submitting) {
    return (
      <PendingTransaction
        loading={transactionPending}
        protocol={amm.protocol}
        fixedApr={amm.fixedApr}
        margin={0}
        onComplete={handleComplete}
      />
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
