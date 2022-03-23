import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import IntegerField from '../IntegerField/IntegerField';

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
    onChangeNotional(parseInt(event.target.value, 10));
  };

  return (
    <IntegerField
      label={<IconLabel label="provided liquidity" icon="information-circle" info="Something" />}
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default NotionalAmount;
