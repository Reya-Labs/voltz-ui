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
  const startDateMillis = startDate?.toMillis();
  const endDateMillis = endDate?.toMillis();
  const percentageComplete = useMemo((): number => {
    if (!startDate || !endDate) {
      return 0;
    }

    // Durations here are both negative (due to diffNow) but that cancels out when calculating percentage
    const totalSeparation = startDate.diff(endDate);
    const separationfromStart = startDate.diffNow();
    const percentage = (separationfromStart.milliseconds * 100) / totalSeparation.milliseconds;

    return Math.floor(percentage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateMillis, endDateMillis]);

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
