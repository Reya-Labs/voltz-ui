import React, { ReactNode } from 'react';

import { Typography } from '../Typography/Typography';
import {
  MiddleContentTypography,
  ProgressBarBoxContainer,
  ProgressBarContainer,
  ProgressBarContentBox,
  ProgressBarPercentageBox,
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
  <ProgressBarContainer data-testid="ProgressBar-Container">
    <ProgressBarContentBox data-testid="ProgressBar-ContentBox">
      <Typography data-testid="ProgressBar-LeftContent" variant="h6">
        {leftContent}
      </Typography>
      <MiddleContentTypography data-testid="ProgressBar-MiddleContent" variant="h6">
        {middleContent}
      </MiddleContentTypography>
      <RightContentTypography data-testid="ProgressBar-RightContent" variant="h6">
        {rightContent}
      </RightContentTypography>
    </ProgressBarContentBox>
    <ProgressBarBoxContainer>
      <ProgressBarPercentageBox
        data-testid="ProgressBar-PercentageBox"
        percentage={Math.min(percentageComplete, 100)}
      />
    </ProgressBarBoxContainer>
  </ProgressBarContainer>
);
