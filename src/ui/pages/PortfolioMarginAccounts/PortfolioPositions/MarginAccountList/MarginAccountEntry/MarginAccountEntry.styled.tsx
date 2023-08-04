import styled from '@emotion/styled';
import { Button, colors, ColorTokens, getColorFromToken } from 'brokoli-ui';

export const MarginAccountEntryBoxWrapper = styled('div')`
  position: relative;
`;

export const MarginAccountEntryBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColorToken',
})<{
  backgroundColorToken: ColorTokens;
}>`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  box-shadow: -2px 0px 8px 0px ${colors.liberty8};
  background-color: ${({ backgroundColorToken }) => getColorFromToken(backgroundColorToken)};
  border: 1px solid ${colors.lavenderWeb7};
  border-radius: 8px;
  transition: all 200ms ease-in;

  &:hover {
    border: 1px solid ${colors.lavenderWeb4};
    cursor: pointer;
    background-color: ${colors.lavenderWeb7};
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
  width: 100px;
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
  top: 12px;
  right: -55px;
`;

export const ViewDetailsButton = styled(Button)`
  padding: 4px 8px;
`;
