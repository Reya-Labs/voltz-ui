import isUndefined from 'lodash.isundefined';
import React from 'react';

import { Typography } from '../../../../../../../../../components/atomic/Typography/Typography';
import { IconLabel } from '../../../../../../../../../components/composite/IconLabel/IconLabel';
import { formatNumber } from '../../../../../../../../../utilities/number';

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
