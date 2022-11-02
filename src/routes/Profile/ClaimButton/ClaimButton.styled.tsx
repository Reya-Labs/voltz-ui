import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { colors } from '@theme';

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
  color: ${({ disabled }) =>
    disabled ? colors.lavenderWeb.darken015 : colors.skyBlueCrayola.base};
`;

export const StretchClaimButton = styled(ClaimButton)`
  display: flex;
  justify-content: space-between;
`;

export const TickWrapper = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const ClaimedAtTypography = styled('span')`
  color: ${colors.skyBlueCrayola.base};
  margin-left: ${({ theme }) => theme.spacing(1)};
`;
