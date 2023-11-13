import styled from '@emotion/styled';

export const LogoAndNavBox = styled('div')`
  display: flex;
  flex-direction: row;
  margin-left: 21.5px;
  gap: 21.5px;
`;
export const PanelBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px 0px 0px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.white800};
`;

export const RightContent = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px 0px 0px;
  gap: 4px;
`;
