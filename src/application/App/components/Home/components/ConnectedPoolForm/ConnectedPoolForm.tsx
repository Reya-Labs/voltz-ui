import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AMM } from '@voltz/v1-sdk';

import { routes } from '@routes';
import { useWallet } from '@hooks';
import {
  PoolForm,
  PoolFormProps,
  HandleSubmitPoolFormArgs,
  PendingTransaction,
} from '@components/interface';

export type ConnectedPoolFormProps = {
  isModifying: boolean;
  amm: AMM | null;
  onReset: () => void;
};

const ConnectedPoolForm: React.FunctionComponent<ConnectedPoolFormProps> = ({
  isModifying,
  amm,
  onReset,
}) => {
  const { account } = useWallet();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [fixedLow, setFixedLow] = useState<PoolFormProps['fixedLow']>();
  const handleSetFixedLow = (newFixedLow: number) => {
    if (!amm) {
      return;
    }

    const { closestUsableFixedRate, closestUsableTick } = amm.closestTickAndFixedRate(newFixedLow);
    console.debug('TICK UPPER', closestUsableTick);

    setFixedLow(closestUsableFixedRate.toNumber());
  };
  const [fixedHigh, setFixedHigh] = useState<PoolFormProps['fixedHigh']>();
  const handleSetFixedHigh = (newFixedHigh: number) => {
    if (!amm) {
      return;
    }

    const { closestUsableFixedRate, closestUsableTick } = amm.closestTickAndFixedRate(newFixedHigh);
    console.debug('TICK LOWER', closestUsableTick);

    setFixedHigh(closestUsableFixedRate.toNumber());
  };
  const [leverage, setLeverage] = useState<PoolFormProps['leverage']>();
  const [margin, setMargin] = useState<PoolFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<PoolFormProps['partialCollateralization']>();
  const [submitting, setSubmitting] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const handleSubmit = async (args: HandleSubmitPoolFormArgs) => {
    setSubmitting(true);
    setTransactionPending(true);

    if (amm && account) {
      const result = await amm.mint({
        recipient: account,
        fixedLow: args.fixedLow || 1,
        fixedHigh: args.fixedHigh || 2,
        margin: args.margin || 10,
        leverage: args.leverage || 10,
      });

      console.debug(result);
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
        margin={margin}
        leverage={leverage}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <PoolForm
      isModifying={isModifying}
      protocol={amm.protocol}
      fixedApr={10}
      variableApr={15}
      startDate={amm.startDateTime}
      endDate={amm.endDateTime}
      fixedLow={fixedLow}
      onChangeFixedLow={handleSetFixedLow}
      fixedHigh={fixedHigh}
      onChangeFixedHigh={handleSetFixedHigh}
      leverage={leverage}
      onChangeLeverage={setLeverage}
      margin={margin}
      onChangeMargin={setMargin}
      partialCollateralization={partialCollateralization}
      onChangePartialCollateralization={setPartialCollateralization}
      onSubmit={handleSubmit}
      onCancel={onReset}
    />
  );
};

export default ConnectedPoolForm;
