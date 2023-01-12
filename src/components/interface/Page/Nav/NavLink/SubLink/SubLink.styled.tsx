import { styled } from '@mui/material/styles';

import { colors } from '../../../../../../theme';
import { Button } from '../../../../../atomic/Button/Button';

export const SubLinkButton = styled(Button)`
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 14px;
  letter-spacing: 0.02em;
  color: ${colors.lavenderWeb.base};
  text-decoration: none;
  background: #251f3f;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  border-radius: 8px;

  &:hover {
    text-decoration: none;
    border-bottom-color: transparent;
    background: #0e0c16;
  }
`;

export const ActiveSubLinkButton = styled(SubLinkButton)`
  background: #0e0c16;
`;
