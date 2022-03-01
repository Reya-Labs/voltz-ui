import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '@routes';
import { data } from '@utilities';
import { PoolForm, PoolFormProps, PendingTransaction } from '@components/interface';

export type ConnectedPoolFormProps = {
  isModifying: boolean;
  datum?: data.TableData;
  onReset: () => void;
  onSubmit: (args: Record<string, unknown>) => Promise<void>;
};

const ConnectedPoolForm: React.FunctionComponent<ConnectedPoolFormProps> = ({
  isModifying,
  datum,
  onReset,
  onSubmit,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [fixedLow, setFixedLow] = useState<PoolFormProps['fixedLow']>();
  const [fixedHigh, setFixedHigh] = useState<PoolFormProps['fixedHigh']>();
  const [leverage, setLeverage] = useState<PoolFormProps['leverage']>();
  const [margin, setMargin] = useState<PoolFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<PoolFormProps['partialCollateralization']>();
  const [submitting, setSubmitting] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const handleSubmit = async (args: Record<string, unknown>) => {
    setSubmitting(true);
    setTransactionPending(true);

    await onSubmit(args);

    setTransactionPending(false);
  };
  const handleComplete = () => {
    setSubmitting(false);
    onReset();

    if (pathname === `/${routes.SWAP}`) {
      navigate(`/${routes.PORTFOLIO}`);
    } else {
      navigate(`/${routes.LP_FARM}`);
    }
  };

  if (!datum) {
    return null;
  }

  if (submitting) {
    return (
      <PendingTransaction
        loading={transactionPending}
        protocol={datum.protocol}
        fixedApr={datum.fixedApr}
        margin={margin}
        leverage={leverage}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <PoolForm
      isModifying={isModifying}
      protocol={datum.protocol}
      fixedApr={datum.fixedApr}
      variableApr={datum.variableApr}
      startDate={datum.startDate}
      endDate={datum.endDate}
      fixedLow={fixedLow}
      onChangeFixedLow={setFixedLow}
      fixedHigh={fixedHigh}
      onChangeFixedHigh={setFixedHigh}
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
