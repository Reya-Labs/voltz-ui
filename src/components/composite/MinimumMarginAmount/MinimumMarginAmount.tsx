import React from 'react';

import IntegerField from '../IntegerField/IntegerField';

export type MinimumMarginAmountProps = {
  minimumMargin?: number;
};

const MinimumMarginAmount: React.FunctionComponent<MinimumMarginAmountProps> = ({
  minimumMargin,
}) => {
  return (
    <IntegerField label="Required margin" value={minimumMargin} sx={{ width: '100%' }} disabled />
  );
};

export default MinimumMarginAmount;
