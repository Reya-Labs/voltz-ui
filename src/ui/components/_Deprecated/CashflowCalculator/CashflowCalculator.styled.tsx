import styled from '@emotion/styled';

export const CashFlowCalculatorBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 40px;
  justify-content: space-between;

  position: relative;
  height: 80px;

  background: linear-gradient(
    90.95deg,
    ${({ theme }) => theme.colors.black900} 0.66%,
    ${({ theme }) => theme.colors.white900} 99.34%
  );
  border-radius: 4px;
`;

export const CashFlowCalculatorLeftBox = styled('div')``;
export const CashFlowCalculatorRightBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
`;

export const ExpectedApyBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;
  width: 264px;
`;

export const AdditionalCashFlowBox = styled('div')`
  box-sizing: border-box;
  border-left: 1px solid ${({ theme }) => theme.colors.black600};
  padding: 0px 16px;
`;

export const TotalCashFlowBox = styled('div')`
  box-sizing: border-box;
  border-left: 1px solid ${({ theme }) => theme.colors.black600};
  padding: 0px 16px;
`;
