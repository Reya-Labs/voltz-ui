import styled from '@emotion/styled';
import { colors, Typography } from 'brokoli-ui';

export const PaginationBox = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  align-items: center;
`;

export const ActionButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  ${({ disabled }) => (disabled ? 'pointer-events: none' : '')}
`;

export const BarBox = styled('div')`
  width: 96px;
  background: ${colors.lavenderWeb4};
  height: 10px;
  margin: 8px;
`;

export const AnimatedBarBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: number }>`
  width: ${({ width }) => width}%;
  background: ${colors.lavenderWeb};
  height: 100%;
  transition: width 500ms ease-in;
`;
