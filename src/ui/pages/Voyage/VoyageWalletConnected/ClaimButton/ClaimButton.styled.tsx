import styled from '@emotion/styled';
import { Button } from 'brokoli-ui';

export const ClaimedAtTypography = styled('span')`
  color: ${({ theme }) => theme.colors.primary100};
  margin-left: 4px;
`;

export const ClaimButtonStyled = styled(Button)`
  padding: 8px 16px;
`;
