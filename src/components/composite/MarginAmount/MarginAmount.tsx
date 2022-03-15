import React from 'react';
import isUndefined from 'lodash/isUndefined';

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
    onChangeMargin(parseInt(event.target.value, 10));
  };

  return (
    <IntegerField
      label="Margin amount"
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default MarginAmount;
