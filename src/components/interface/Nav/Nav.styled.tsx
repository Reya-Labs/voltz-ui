import { colors } from '../../../theme';
import { styled } from '@mui/material/styles';
import { Icon } from '../../atomic/Icon/Icon';
import Box from '@mui/material/Box';

export const NavBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const VoltzIconBox = styled(Box)`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing(4)};
  filter: drop-shadow(0px 4px 20px ${colors.wildStrawberry.base})
    drop-shadow(0px 0px 40px ${colors.wildStrawberry.base});
`;
export const VoltzIcon = styled(Icon)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: filter 150ms ease-in;
  &:hover {
    filter: drop-shadow(0px 4px 20px ${colors.wildStrawberry.base})
      drop-shadow(0px 0px 40px ${colors.wildStrawberry.base});
  }
  &:hover > path {
    fill: ${colors.lavenderWeb.base};
  }
  & > path {
    fill: ${colors.lavenderWeb.darken010};
  }
`;
