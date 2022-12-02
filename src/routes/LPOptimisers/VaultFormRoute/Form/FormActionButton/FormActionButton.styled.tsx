import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../../theme';

export const ActionButton = styled(Button)<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  border-radius: 4px;
  flex: 1;
`;

export const BlueActionButton = styled(ActionButton)`
  background: #00556d;
  color: ${colors.skyBlueCrayola.base};
`;

export const DarkBlueActionButton = styled(ActionButton)`
  /* Liberty 4 */
  background: #2b2548;
  color: ${colors.skyBlueCrayola};
`;

export const IconWrapper = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
`;
