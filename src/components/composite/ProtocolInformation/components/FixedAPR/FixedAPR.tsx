import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { Agents } from '@contexts';
import { formatNumber } from '@utilities';
import { isUndefined } from 'lodash';

export type FixedAPRProps = {
  agent?: Agents;
  fixedApr?: number;
};

const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({agent, fixedApr}) => {
  // const { fixedApr } = useAMMContext();
  // const { result, loading, call } = fixedApr;

  // useEffect(() => {
  //   call();
  // }, [call]);

  const renderValue = () => {
    if (isUndefined(fixedApr)) {
      return <Box sx={{ fontSize: 18 }}>Loading...</Box>;
    }

    return `${formatNumber(fixedApr)}%`;
  };

  return (
    <Typography
      variant="h3"
      label={<IconLabel label="fixed apr" icon="information-circle" info="something" removeIcon />}
      agentStyling
      agent={agent}
    >
      {renderValue()}
    </Typography>
  );
};

export default FixedAPR;
