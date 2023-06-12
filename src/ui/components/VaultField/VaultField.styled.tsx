import styled from '@emotion/styled';
import { colors, Typography } from 'brokoli-ui';

export const VaultFieldBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const TitleBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
`;

export const TitleTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;

  letter-spacing: 0.02em;

  color: ${colors.lavenderWeb};
`;

export const VaultMetricsBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 64px;
`;
