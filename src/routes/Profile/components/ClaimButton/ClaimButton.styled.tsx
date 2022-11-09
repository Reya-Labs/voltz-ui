import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';

export const ClaimButton = styled(Button)<{ disabled: boolean }>`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  background: #1e1a33;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  color: ${({ disabled }) => (disabled ? colors.lavenderWeb2 : colors.skyBlueCrayola)};
`;

export const StretchClaimButton = styled(ClaimButton)`
  display: flex;
  justify-content: space-between;
`;

export const TickWrapper = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const ClaimedAtTypography = styled('span')`
  color: ${colors.skyBlueCrayola};
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const ClaimErrorTypography = styled('span')`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: ${colors.wildStrawberry};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;
