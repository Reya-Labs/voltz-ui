import React from 'react';
import { Position } from '@voltz-protocol/v1-sdk';
import { DateTime } from 'luxon';
import { Button, Typography } from '@components/atomic';
import { MaturityInformation } from '@components/composite';
import { Box } from '@mui/material';

type MaturityProps = {
  onSettle: () => void;
  position: Position;
}

const Maturity = ({ onSettle, position }: MaturityProps) => {
  if (DateTime.now() >= position.amm.endDateTime) {
    return (
      <Box sx={{ textAalign: 'center' }}>
        <Button variant="contained" onClick={onSettle} disabled={position.isSettled}>
          <Typography agentStyling variant="body2">
            {position.isSettled ? 'SETTLED' : 'SETTLE'}
          </Typography>
        </Button>
      </Box>
    );
  } else {
    return (
      <MaturityInformation
        label='Maturity'
        startDate={position.amm.startDateTime}
        endDate={position.amm.endDateTime}
      />
    ); 
  }   
}

export default Maturity;