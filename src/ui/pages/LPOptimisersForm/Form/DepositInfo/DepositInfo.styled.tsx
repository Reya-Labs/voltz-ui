import styled from '@emotion/styled';
import { Typography } from 'brokoli-ui';

export const VaultInfoBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  align-self: stretch;
`;

export const PositionBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
  gap: 8px;

  background: ${({ theme }) => theme.colors.black600};
  border-radius: 4px;

  align-self: stretch;
`;

export const PendingDepositTypography = styled(Typography)`
  margin-top: -8px;
  color: ${({ theme }) => theme.colors.white400};
`;

export const PendingDepositAmountSpan = styled('span')`
  color: ${({ theme }) => theme.colors.primary100};
`;
