import styled from '@emotion/styled';
import { Button } from 'brokoli-ui';

import { Icon as IconComponent } from '../../../../components/Icon/Icon';

export const Container = styled('div')`
  background-color: ${({ theme }) => theme.colors.black900};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.25s ease-out 0s,
    border 0.25s ease-out 0s;
  box-sizing: border-box;

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.black300} 0px 0px 35px;
  }
`;

export const BadgePillBox = styled('div')`
  margin-bottom: 16px;
`;

export const BadgeBox = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: -65px;
  margin-top: -35px;
  border-radius: 4px;
`;

export const TitleBox = styled('div')`
  margin-bottom: 8px;
`;

export const ButtonBox = styled('div')`
  margin-top: auto;
`;

export const Icon = styled(IconComponent)`
  width: 230px;
  height: 326px;
`;

export const ClaimButtonStyled = styled(Button)`
  padding: 8px 16px;
`;
