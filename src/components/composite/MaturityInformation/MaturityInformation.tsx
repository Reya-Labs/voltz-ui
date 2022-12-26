import { DateTime } from 'luxon';
import React, { useMemo } from 'react';

import { formatDateTime } from '../../../utilities/date';
import { ProgressBar } from '../../atomic/ProgressBar/ProgressBar';
import { withLabel } from '../../hoc/withLabel/withLabel';

export type MaturityInformationProps = {
  startDate?: DateTime;
  endDate?: DateTime;
};

const MaturityInformationComponent: React.FunctionComponent<MaturityInformationProps> = ({
  startDate,
  endDate,
}) => {
  const percentageComplete = useMemo((): number => {
    if (!startDate || !endDate) {
      return 0;
    }

    const totalSeparation = endDate.toMillis() - startDate.valueOf();
    const separationFromStart = Date.now().valueOf() - startDate.valueOf();
    const percentage = (separationFromStart * 100) / totalSeparation;

    return Math.floor(percentage);
  }, [startDate, endDate]);

  const formattedEndDate = endDate ? formatDateTime(endDate) : '';

  return (
    <ProgressBar
      leftContent={percentageComplete >= 100 ? 'COMPLETED' : formattedEndDate}
      percentageComplete={percentageComplete}
      rightContent={`${Math.min(percentageComplete, 100)}%`}
    />
  );
};

export const MaturityInformation = withLabel<MaturityInformationProps>(
  MaturityInformationComponent,
);
