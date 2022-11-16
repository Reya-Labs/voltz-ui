import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { colors } from '@theme';

export const CopyLinkButton = styled(Button)<{ disabled: boolean }>`
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

export const IconWrapper = styled('div')`
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
`;

export const CopyLinkErrorTypography = styled('span')`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: ${colors.vzCustomRed1.base};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;
