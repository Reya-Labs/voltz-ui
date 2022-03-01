import React, { useState } from 'react';

import { data } from '@utilities';
import { PoolForm, PoolFormProps } from '@components/interface';

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
  const [fixedLow, setFixedLow] = useState<PoolFormProps['fixedLow']>();
  const [fixedHigh, setFixedHigh] = useState<PoolFormProps['fixedHigh']>();
  const [leverage, setLeverage] = useState<PoolFormProps['leverage']>();
  const [margin, setMargin] = useState<PoolFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<PoolFormProps['partialCollateralization']>();
  const handleSubmit = async (args: Record<string, unknown>) => {
    await onSubmit(args);

    onReset();
  };

  if (!datum) {
    return null;
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
