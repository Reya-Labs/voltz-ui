import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../theme';
import { Icon } from '../../atomic/Icon/Icon';

export const NavBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const VoltzIconBox = styled(Box)`
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing(4)};
  filter: drop-shadow(0px 4px 20px ${colors.wildStrawberry})
    drop-shadow(0px 0px 40px ${colors.wildStrawberry});
`;
export const VoltzIcon = styled(Icon)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: filter 150ms ease-in;
  &:hover {
    filter: drop-shadow(0px 4px 20px ${colors.wildStrawberry})
      drop-shadow(0px 0px 40px ${colors.wildStrawberry});
  }
  &:hover > path {
    fill: ${colors.lavenderWeb};
  }
  & > path {
    fill: ${colors.lavenderWeb1};
  }
`;
