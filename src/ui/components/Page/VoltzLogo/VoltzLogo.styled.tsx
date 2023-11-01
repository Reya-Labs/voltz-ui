import styled from '@emotion/styled';

import { ReactComponent as VoltzLogoSvg } from './voltz-logo.svg';

export const VoltzLogoBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const VoltzLogoIcon = styled(VoltzLogoSvg)`
  cursor: pointer;
  transition: filter 200ms ease-in;
  filter: drop-shadow(0px 0px 20px ${({ theme }) => theme.colors.error100});

  &:hover {
    filter: drop-shadow(0px 0px 10px ${({ theme }) => theme.colors.error100});
  }
`;
