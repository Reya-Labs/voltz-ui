import React, { useState } from 'react';
import isNull from 'lodash/isNull';

import { data } from '@utilities';
import { PoolForm, PoolFormProps } from '@components/interface';
import { useAgent } from '@hooks';

export type ConnectedPoolFormProps = {
  vammId: string;
  positionId: string | null;
  mode: data.Mode;
  data: data.TEMPORARY_Pool[];
  onReset: () => void;
};

const ConnectedPoolForm: React.FunctionComponent<ConnectedPoolFormProps> = ({
  vammId,
  positionId,
  mode,
  data: rawData,
  onReset,
}) => {
  const [fixedLow, setFixedLow] = useState<PoolFormProps['fixedLow']>();
  const [fixedHigh, setFixedHigh] = useState<PoolFormProps['fixedHigh']>();
  const [leverage, setLeverage] = useState<PoolFormProps['leverage']>();
  const [margin, setMargin] = useState<PoolFormProps['margin']>();
  const [partialCollateralization, setPartialCollateralization] =
    useState<PoolFormProps['partialCollateralization']>();
  const handleSubmit = (args: Record<string, unknown>) => console.warn(args);
  const { agent } = useAgent();
  const transformedData = data.transformData({ data: rawData, mode, agent });
  const datum = transformedData.find(({ id: datumVammId, positionId: datumPositionId }) => {
    if (datumVammId !== vammId) {
      return false;
    }

    if (!isNull(positionId) && datumPositionId !== positionId) {
      return false;
    }

    return true;
  });

  if (!datum) {
    return null;
  }

  return (
    <PoolForm
      isModifying={!isNull(positionId)}
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
