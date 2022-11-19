import React, { ReactNode } from 'react';
import { Typography } from '@components/atomic';
import {
  MiddleContentTypography,
  ProgressBarBox,
  ProgressBarBoxContainer,
  ProgressBarContainer,
  ProgressBarContentBox,
  RightContentTypography,
} from './ProgressBar.styled';

type ProgressBarProps = {
  leftContent?: ReactNode;
  middleContent?: ReactNode;
  rightContent?: ReactNode;
  percentageComplete?: number;
};

export const ProgressBar = ({
  leftContent,
  middleContent,
  rightContent,
  percentageComplete = 0,
}: ProgressBarProps) => (
  <ProgressBarContainer>
    <ProgressBarContentBox>
      <Typography variant="h6">{leftContent}</Typography>
      <MiddleContentTypography variant="h6">{middleContent}</MiddleContentTypography>
      <RightContentTypography variant="h6">{rightContent}</RightContentTypography>
    </ProgressBarContentBox>
    <ProgressBarBoxContainer>
      <ProgressBarBox percentage={Math.min(percentageComplete, 100)} />
    </ProgressBarBoxContainer>
  </ProgressBarContainer>
);

export default ProgressBar;
