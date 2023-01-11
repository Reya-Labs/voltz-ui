import React from 'react';
import CountUp from 'react-countup';

import { PercentageTypography } from './Percentage.styled';

type PercentageProps = {
  percentage: number;
};

export const Percentage: React.FunctionComponent<PercentageProps> = React.memo(({ percentage }) => (
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
));
