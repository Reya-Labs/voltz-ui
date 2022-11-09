import { Typography } from '@components/atomic';
import { colors } from '@theme';
import CountUp from 'react-countup';
import React from 'react';

type PercentageProps = {
  percentage: number;
};

const PercentageTypography: React.FunctionComponent = ({ children }) => (
  <Typography
    variant="body2"
    sx={{
      color: colors.lavenderWeb.base,
      fontSize: '14px',
      lineHeight: '14px',
      fontWeight: 400,
    }}
  >
    {children}
  </Typography>
);

export const Percentage: React.FunctionComponent<PercentageProps> = React.memo(({ percentage }) => {
  return (
    <PercentageTypography>
      <CountUp
        start={0}
        end={percentage}
        delay={0}
        duration={0.7}
        formattingFn={(value) => `${value}%`}
      >
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    </PercentageTypography>
  );
});
