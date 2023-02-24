import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const ChartFiltersBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
  gap: 8px;
  width: 40px;
`;

export const ChartFilterButtonBox = styled('div')<{ active: boolean }>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  background: ${({ active }) => (active ? colors.lavenderWeb7 : 'transparent')};

  border-radius: 4px;
  transition: background 300ms ease-in;
  cursor: pointer;

  &:hover {
    background: ${colors.lavenderWeb7};
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
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>`
  background: ${({ color }) => color};
  box-sizing: border-box;
  width: 24px;
  height: 1px;
`;
