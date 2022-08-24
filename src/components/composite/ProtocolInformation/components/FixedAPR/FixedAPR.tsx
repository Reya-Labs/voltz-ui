import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import { IconLabel } from '@components/composite';
import { Agents } from '@contexts';
import { formatNumber } from '@utilities';

export type FixedAPRProps = {
  agent?: Agents;
};

const FixedAPR: React.FunctionComponent<FixedAPRProps> = ({agent}) => {
  const { fixedApr } = useAMMContext();
  const { result, loading, call } = fixedApr;

  useEffect(() => {
    call();
  }, [call]);

  const renderValue = () => {
    if (loading) {
      return <Box sx={{ fontSize: 18 }}>Loading...</Box>;
    }

    if (!result) {
      return '0%';
    }

    return `${formatNumber(result)}%`;
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
