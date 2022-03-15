import React, { useState } from 'react';
import isNull from 'lodash/isNull';
import { useLocation, useNavigate } from 'react-router-dom';
import { AMM, Position } from '@voltz/v1-sdk';

import { routes } from '@routes';
import { useWallet, useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import {
  SwapForm,
  SwapFormProps,
  HandleSubmitSwapFormArgs,
  PendingTransaction,
} from '@components/interface';

export type ConnectedSwapFormProps = {
  amm: AMM | null;
  position: Position | null;
  onReset: () => void;
};

const ConnectedSwapForm: React.FunctionComponent<ConnectedSwapFormProps> = ({
  amm: defaultAMM,
  position,
  onReset,
}) => {
  const { agent } = useAgent();
  const amm = !isNull(defaultAMM) ? defaultAMM : position?.amm;
  const { account } = useWallet();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [fixedLow, setFixedLow] = useState<SwapFormProps['fixedLow']>();
  const handleSetFixedLow = (newFixedLow: number) => {
    if (!amm) {
      return;
    }

    const { closestUsableFixedRate } = amm.closestTickAndFixedRate(newFixedLow);

    setFixedLow(closestUsableFixedRate.toNumber());
  };
  const [fixedHigh, setFixedHigh] = useState<SwapFormProps['fixedHigh']>();
  const handleSetFixedHigh = (newFixedHigh: number) => {
    if (!amm) {
      return;
    }

    const { closestUsableFixedRate } = amm.closestTickAndFixedRate(newFixedHigh);

    setFixedHigh(closestUsableFixedRate.toNumber());
  };
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
          fixedLow: args.fixedLow || 1,
          fixedHigh: args.fixedHigh || 2,
          notional: args.notional || 1,
          margin: args.margin || 1,
        });

        console.debug(result);
      } catch (mintError) {}
    }

    setTransactionPending(false);
  };
  const handleComplete = () => {
    setSubmitting(false);
    onReset();

    switch (pathname) {
      case `/${routes.SWAP}`:
      case `/${routes.PORTFOLIO}`: {
        navigate(`/${routes.PORTFOLIO}`);

        break;
      }

      default: {
        navigate(`/${routes.LP_FARM}`);

        break;
      }
    }
  };

  if (!amm) {
    return null;
  }

  if (submitting) {
    return (
      <PendingTransaction
        loading={transactionPending}
        protocol={amm.protocol}
        fixedApr={10}
        leverage={0}
        margin={0}
        onComplete={() => null}
      />
    );
  }

  return (
    <SwapForm
      protocol={amm.protocol}
      fixedApr={10}
      variableApr={15}
      startDate={amm.startDateTime}
      endDate={amm.endDateTime}
      fixedLow={fixedLow}
      onChangeFixedLow={handleSetFixedLow}
      fixedHigh={fixedHigh}
      onChangeFixedHigh={handleSetFixedHigh}
      notional={notional}
      onChangeNotional={setNotional}
      margin={margin}
      partialCollateralization={partialCollateralization}
      onChangePartialCollateralization={setPartialCollateralization}
      onChangeMargin={setMargin}
      onSubmit={handleSubmit}
      onCancel={onReset}
    />
  );
};

export default ConnectedSwapForm;
