import React from 'react';
import { Position } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { Box } from '@mui/material';

type MaturityProps = {
  position: Position;
}

const Maturity = ({ position }: MaturityProps) => {
  return (
    <MaturityInformation
      label='Maturity'
      startDate={position.amm.startDateTime}
      endDate={position.amm.endDateTime}
    />
  ); 
}

export default Maturity;