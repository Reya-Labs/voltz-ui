import React from 'react';

import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { formatNumber } from '../../../../../../../utilities';
import isUndefined from 'lodash/isUndefined';

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
      variant="h3"
      label={<IconLabel label="fixed apr" icon="information-circle" info="something" removeIcon />}
      agentStyling
    >
      {renderValue()}
    </Typography>
  );
};
