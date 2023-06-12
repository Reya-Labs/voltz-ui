import styled from '@emotion/styled';

import { Typography } from '../../../../../components/atomic/Typography/Typography';

export const ContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  width: 100%;
`;

export const DescriptionTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.02em;

  /* Lavender Web */
  color: #e1ddf7;
`;

export const ActionBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const ActionLeftContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
export const ActionRightContentBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BatchBudgetContentBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
`;

export const BatchBudgetValueBox = styled('div')`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
