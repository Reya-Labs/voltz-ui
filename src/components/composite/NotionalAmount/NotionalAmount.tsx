import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import IntegerField from '../IntegerField/IntegerField';
import { useAgent } from '@hooks';
import { Agents } from 'src/components/contexts';

export type NotionalAmountProps = {
  protocol?: string;
  defaultNotional?: number;
  notional?: number;
  onChangeNotional: (value: number) => void;
};

const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  defaultNotional,
  notional,
  onChangeNotional,
}) => {
  const value = isUndefined(notional) ? defaultNotional : notional;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeNotional(parseFloat(event.target.value));
  };
  const { agent } = useAgent();

  const getLabel = () => {
    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return "provided liquidity";
    }
    return "notional traded";
  }

  const getInfo = () => {
    if (agent === Agents.LIQUIDITY_PROVIDER) {
      return "Choose the notional amount of liquidity you wish to provide. Learn more.";
    }
    return "Choose the notional you wish to trade. The notional amount is the total size of your trade. Learn more.";
  }

  return (
    <IntegerField
      label={<IconLabel label={getLabel()} icon="information-circle" info={getInfo()} />}
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default NotionalAmount;
