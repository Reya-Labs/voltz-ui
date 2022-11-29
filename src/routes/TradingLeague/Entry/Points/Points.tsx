import React from 'react';
import CountUp from 'react-countup';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';
import { formatNumber } from '../../../../utilities/number';

type PointsProps = {
  points: number;
};

const PointsTypography: React.FunctionComponent = ({ children }) => (
  <Typography
    sx={{
      color: colors.lavenderWeb.base,
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 400,
      padding: (theme) => theme.spacing(0, 4),
      textAlign: 'right',
    }}
    variant="body2"
  >
    {children}
  </Typography>
);

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
