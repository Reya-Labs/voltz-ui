import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAMMContext } from '@contexts';
import { Typography } from '@components/atomic';
import IconLabel from '../../../IconLabel/IconLabel';
import { Agents } from '@contexts';
import { formatNumber } from '@utilities';
import { isUndefined } from 'lodash';

export type VariableAPYProps = {
  agent?: Agents;
  variableApy?: number;
};

const VariableAPY: React.FunctionComponent<VariableAPYProps> = ({agent, variableApy}) => {

  const renderValue = () => {
    if (isUndefined(variableApy)) {
      return <Box sx={{ fontSize: 18 }}>Loading...</Box>;
    }

    return `${formatNumber(variableApy * 100)}%`;
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
