import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';

export const DepositButton = styled(Button)<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4, 6)};

  background: #00556d;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
  flex: 1;
`;

export const IconWrapper = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
`;
