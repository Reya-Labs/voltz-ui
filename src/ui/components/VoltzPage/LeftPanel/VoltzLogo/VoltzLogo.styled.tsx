import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

import { ReactComponent as VoltzLogoSvg } from './voltz-logo.svg';

export const VoltzLogoBox = styled('div')`
  height: 58px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const VoltzLogoIcon = styled(VoltzLogoSvg)`
  cursor: pointer;
  transition: filter 200ms ease-in;
  filter: drop-shadow(0px 0px 20px ${colors.wildStrawberry});

  &:hover {
    filter: drop-shadow(0px 0px 10px ${colors.wildStrawberry});
  }
`;
