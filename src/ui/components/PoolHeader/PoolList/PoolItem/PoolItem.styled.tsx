import styled from '@emotion/styled';

export const PoolHeaderBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px 0px 0px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white900};
  transition: background-color 300ms ease-in;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.white800};
  }
`;

export const PoolHeaderDetailsBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
  gap: 12px;
  height: 54px;
`;

export const MarketTokenInformationBox = styled('div')`
  padding: 8px 16px;
  min-width: 265px;
`;

export const FixedBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.white800};
  min-width: 70px;
`;

export const VariableBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.white800};
  min-width: 110px;
`;

export const MaturityBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
