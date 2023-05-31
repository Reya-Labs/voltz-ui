import styled from '@emotion/styled';

export const HeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 8px;
`;

export const RightBox = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ValueBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const CurrentBalanceBox = styled(ValueBox)`
  width: 80px;
`;
export const AutomaticRolloverBox = styled(ValueBox)`
  width: 100px;
`;
