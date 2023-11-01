import styled from '@emotion/styled';
import { ColorTokens, getColorFromToken } from 'brokoli-ui';

export const ChartFiltersBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
  gap: 8px;
  width: 40px;
`;

export const ChartFilterButtonBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'disabled',
})<{ disabled: boolean; active: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  background: ${({ theme, active }) => (active ? theme.colors.white800 : 'transparent')};

  border-radius: 4px;
  transition: background 200ms ease-in;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ theme }) => theme.colors.white800};
  }
`;

export const ChartFilterButton = styled('button')`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Underline = styled('div', {
  shouldForwardProp: (prop) => prop !== 'colorToken',
})<{ colorToken: ColorTokens }>`
  background: ${({ theme, colorToken }) => getColorFromToken({ theme, colorToken })};
  box-sizing: border-box;
  width: 24px;
  height: 1px;
`;
