import styled from '@emotion/styled';
import { Button, ColorTokens, getColorFromToken, shouldNotForwardProps } from 'brokoli-ui';

export const MarginAccountEntryBoxWrapper = styled('div')`
  position: relative;
`;

export const MarginAccountEntryBox = styled(
  'div',
  shouldNotForwardProps(['backgroundColorToken', 'isPositionListShown']),
)<{
  backgroundColorToken: ColorTokens;
  isPositionListShown: boolean;
}>`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  box-shadow: -2px 0px 8px 0px ${({ theme }) => theme.colors.black900};
  background-color: ${({ theme, backgroundColorToken }) =>
    getColorFromToken({ theme, colorToken: backgroundColorToken })};
  border: 1px solid ${({ theme }) => theme.colors.white800};
  border-radius: ${({ isPositionListShown }) => (isPositionListShown ? '8px 8px 0px 0px' : '8px')};
  transition: all 200ms ease-in;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.white500};
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.white800};
  }
`;

const InfoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const BorderBox = styled(InfoBox)`
  justify-content: center;
  padding: 4px 4px;
  align-items: center;
`;

export const LeftBox = styled(InfoBox)`
  width: 342px;
`;

export const RightBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BalanceBox = styled(InfoBox)`
  padding: 0px 4px;
  width: 150px;
`;
export const PositionsCountBox = styled(BorderBox)`
  width: 80px;
`;
export const MarginRatioBox = styled(BorderBox)``;

export const ViewDetailsBox = styled(BorderBox)`
  padding: 0px 0px 0px 8px;
`;

export const ChainIconAndNameContainer = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const TestPillContainer = styled('div')`
  position: absolute;
  z-index: 2;
  top: 10px;
  right: -55px;
`;

export const ViewDetailsButton = styled(Button)`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.white800};
  background: ${({ theme }) => theme.colors.white800};
`;

export const ToggleCaretBox = styled('div')`
  color: ${({ theme }) => theme.colors.white100};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;
