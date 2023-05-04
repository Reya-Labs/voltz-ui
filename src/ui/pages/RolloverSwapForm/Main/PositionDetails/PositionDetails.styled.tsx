import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const PositionDetailsBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 40px;
  justify-content: space-between;

  position: relative;
  height: 80px;

  background: linear-gradient(90.95deg, ${colors.liberty8} 0.66%, ${colors.lavenderWeb8} 99.34%);
  border-radius: 4px;
`;

export const PositionDetailsLeftBox = styled('div')``;
export const PositionDetailsRightBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
`;

export const NotionalBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px 0px;
  min-width: 100px;
`;

const BorderedBox = styled('div')`
  border-left: 1px solid ${colors.liberty5};
  padding: 0px 16px;
  min-width: 100px;
`;

export const ReceivingBox = styled(BorderedBox)``;
export const PayingBox = styled(BorderedBox)``;
export const RealisedPNLBox = styled(BorderedBox)``;
export const CashFlowBox = styled(BorderedBox)``;
export const DepositedMarginBox = styled(BorderedBox)``;

export const TooltipBox = styled('div')`
  width: 300px;
`;
