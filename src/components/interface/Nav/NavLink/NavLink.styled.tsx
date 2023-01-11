import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';
import { Button } from '../../../atomic/Button/Button';

export const NavLinkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isPopoverOpen',
})<{
  isPopoverOpen: boolean;
  isActive: boolean;
}>`
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.02em;
  color: ${colors.lavenderWeb.base};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  opacity: ${({ isPopoverOpen, isActive }) => (isPopoverOpen || isActive ? 1 : 0.7)};
  background: ${({ isPopoverOpen, isActive }) =>
    isPopoverOpen || isActive ? '#352e56' : undefined};
  text-decoration: none;
  text-transform: none;
  margin-left: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ isPopoverOpen }) => (isPopoverOpen ? '8px 8px 0px 0px' : '8px')};

  &:hover {
    opacity: 1;
    background: #352e56;
    text-decoration: none;
  }
`;

export const NavLinkPopover = styled(Popover)`
  & .MuiPaper-root {
    background: #352e56;
    border-radius: 0px 8px 8px 8px;
  }

  & .MuiButtonGroup-root {
    padding: ${({ theme }) => theme.spacing(4)};
    row-gap: ${({ theme }) => theme.spacing(4)};
    min-width: 176px;
  }
`;
