import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import IntegerField from '../IntegerField/IntegerField';

export type MarginAmountProps = {
  protocol?: string;
  defaultMargin?: number;
  maxMargin?: number;
  margin?: number;
  onChangeMargin: (value: number) => void;
};

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  defaultMargin,
  margin,
  onChangeMargin,
}) => {
  const value = isUndefined(margin) ? defaultMargin : margin;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // onChangeMargin(parseFloat(parseFloat(event.target.value).toFixed(2)));
    onChangeMargin(parseFloat(event.target.value));
  };

  return (
    <IntegerField
      label={<IconLabel label="margin amount" icon="information-circle" info="Additional margin amount is defined based on your notional. You are required to deposit margin in order to execute this trade. Learn more." />}
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default MarginAmount;
