import styled from '@emotion/styled';
import { Button, colors } from 'brokoli-ui';

export const PositionStatusBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// TODO: potential candidate for brokoli ui
const ButtonXS = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
  background: ${colors.lavenderWeb7};
  border: 1px solid ${colors.lavenderWeb7};

  box-shadow: 0px 2px 10px ${colors.liberty6}, 0px 8px 40px rgba(38, 103, 255, 0.2),
    0px 5px 40px rgba(255, 74, 169, 0.2);
  border-radius: 4px;

  width: 80px;
`;
export const RolloverButton = styled(ButtonXS)``;
export const SettleButton = styled(ButtonXS)``;
