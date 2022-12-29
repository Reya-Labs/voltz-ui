import React from 'react';
import CountUp from 'react-countup';

import { formatNumber } from '../../../../utilities/number';
import { PointsTypography } from './Points.styled';

type PointsProps = {
  points: number;
};

export const Points: React.FunctionComponent<PointsProps> = ({ points }) => {
  if (points <= 0) {
    return <PointsTypography>---</PointsTypography>;
  }

  return (
    <PointsTypography>
      <CountUp delay={0} end={points} formattingFn={formatNumber} start={0}>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    </PointsTypography>
  );
};
