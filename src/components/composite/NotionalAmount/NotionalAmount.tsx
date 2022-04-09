import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';

export type NotionalAmountProps = {
  protocol?: string;
  defaultNotional?: number;
  notional?: number;
  onChangeNotional: (value: number) => void;
};

const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  protocol,
  defaultNotional,
  notional,
  onChangeNotional,
}) => {
  const value = isUndefined(notional) ? defaultNotional : notional;
  const handleChange = (newValue: string) => {
    onChangeNotional(parseInt(newValue, 10));
  };

  return (
    <MaskedIntegerField
      affix={protocol || ''}
      label={<IconLabel label="provided liquidity" icon="information-circle" info="Something" />}
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default NotionalAmount;
