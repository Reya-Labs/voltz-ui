import isUndefined from 'lodash.isundefined';
import React from 'react';

import { formatNumber } from '../../../../../../../utilities/number';
import { Typography } from '../../../../../../atomic/Typography/Typography';
import { IconLabel } from '../../../../../../composite/IconLabel/IconLabel';

export type FixedAPRProps = {
  fixedApr?: number;
};

export const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({ fixedApr }) => {
  const renderValue = () => {
    if (isUndefined(fixedApr)) {
      return 'Loading...';
    }

    return `${formatNumber(fixedApr)}%`;
  };

  return (
    <Typography
      label={<IconLabel icon="information-circle" info="something" label="fixed apr" removeIcon />}
      variant="h3"
      agentStyling
    >
      {renderValue()}
    </Typography>
  );
};
