import { Typography } from '@components/atomic';
import { colors } from '@theme';
import CountUp from 'react-countup';
import { formatNumber } from '@utilities';
import React from 'react';

type PointsProps = {
  points: number;
};

const PointsTypography: React.FunctionComponent = ({ children }) => (
  <Typography
    variant="body2"
    sx={{
      color: colors.lavenderWeb.base,
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 400,
      padding: (theme) => theme.spacing(0, 4),
      textAlign: 'right',
    }}
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
      <CountUp start={0} end={points} delay={0} formattingFn={formatNumber}>
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    </PointsTypography>
  );
};
