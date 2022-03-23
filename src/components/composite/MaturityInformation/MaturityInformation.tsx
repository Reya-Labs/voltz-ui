import React, { useMemo } from 'react';
import { DateTime } from 'luxon';
import Decimal from 'decimal.js';
import Box from '@mui/material/Box';

import { Typography, Slider } from '@components/atomic';
import { withLabel } from '../../utilities';

export type MaturityInformationProps = {
  startDate?: DateTime;
  endDate?: DateTime;
};

const MaturityInformation: React.FunctionComponent<MaturityInformationProps> = ({
  startDate,
  endDate,
}) => {
  const startDateMillis = startDate?.toMillis();
  const endDateMillis = endDate?.toMillis();
  const percentageComplete = useMemo((): number => {
    if (!startDate || !endDate) {
      return 0;
    }

    const totalSeparation = endDate.diff(startDate);
    const separationfromStart = startDate.diffNow();

    const percentage = new Decimal(separationfromStart.milliseconds)
      .dividedBy(new Decimal(totalSeparation.milliseconds))
      .times(100);

    return percentage.trunc().toNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateMillis, endDateMillis]);
  const formattedEndDate = endDate?.toLocaleString();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{formattedEndDate}</Typography>
        <Typography variant="h6">{percentageComplete}%</Typography>
      </Box>
      <Slider controlled value={percentageComplete} />
    </Box>
  );
};

export default withLabel<MaturityInformationProps>(MaturityInformation);
