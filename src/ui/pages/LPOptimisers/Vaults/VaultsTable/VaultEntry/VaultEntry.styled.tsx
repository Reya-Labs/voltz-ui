import styled from '@emotion/styled';

export const VaultEntryContainerBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 350px;
`;

export const VaultEntryInfoBox = styled('div')`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  background: ${({ theme }) => theme.colors.black700};
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.black600};
  border-radius: 8px 8px 0px 0px;

  flex: 1;
`;

export const PoolOutlineBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0px;
  gap: 8px;
`;

export const PoolFieldsBox = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const PositionBox = styled('div')`
  background: ${({ theme }) => theme.colors.black600};
  border-radius: 0 4px;

  align-self: stretch;
`;
