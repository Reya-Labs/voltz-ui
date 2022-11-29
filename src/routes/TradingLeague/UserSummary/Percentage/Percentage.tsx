import React from 'react';
import CountUp from 'react-countup';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';

type PercentageProps = {
  percentage: number;
};

const PercentageTypography: React.FunctionComponent = ({ children }) => (
  <Typography
    sx={{
      color: colors.lavenderWeb.base,
      fontSize: '14px',
      lineHeight: '14px',
      fontWeight: 400,
    }}
    variant="body2"
  >
    {children}
  </Typography>
);

export const Percentage: React.FunctionComponent<PercentageProps> = React.memo(({ percentage }) => {
  return (
    <PercentageTypography>
      <CountUp
        delay={0}
        duration={0.7}
        end={percentage}
        formattingFn={(value) => `${value}%`}
        start={0}
      >
        {({ countUpRef }) => <span ref={countUpRef} />}
      </CountUp>
    </PercentageTypography>
  );
});
