import styled from '@emotion/styled';
import { shouldNotForwardProps, Typography } from 'brokoli-ui';

export const PaginationBox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled(Typography, shouldNotForwardProps(['disabled']))<{
  disabled: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  ${({ disabled }) => (disabled ? 'pointer-events: none' : '')}
`;

export const BarBox = styled('div')`
  width: 96px;
  background: ${({ theme }) => theme.colors.white500};
  height: 10px;
  margin: 8px;
`;

export const AnimatedBarBox = styled('div', shouldNotForwardProps(['width']))<{ width: number }>`
  width: ${({ width }) => width}%;
  background: ${({ theme }) => theme.colors.white100};
  height: 100%;
  transition: width 500ms ease-in;
`;
