import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import IconLabel from '../../../IconLabel/IconLabel';
import { Agents } from '@contexts';
import { formatNumber } from '@utilities';

export type VariableAPYProps = {
  agent?: Agents;
};

const VariableAPY: React.FunctionComponent<VariableAPYProps> = ({agent}) => {
  const { variableApy } = useAMMContext();
  const { result, loading, call } = variableApy;

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

    return `${formatNumber(result * 100)}%`;
  };

  return (
    <Typography
      variant="h3"
      label={<IconLabel label="variable apy" icon="information-circle" info="The historical Annual Percentage Yield of the pool. The value is computed by aggregating the historical rates of the underlying rate oracle over a fixed look-back window." removeIcon />}
      agentStyling
      agent={agent}
    >
      {renderValue()}
    </Typography>
  );
};

export default VariableAPY;
