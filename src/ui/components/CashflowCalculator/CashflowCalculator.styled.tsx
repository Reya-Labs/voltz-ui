import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const CashFlowCalculatorBox = styled('div')`
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 120px;
  height: 240px;
  position: relative;
  border-bottom: 1px solid ${colors.lavenderWeb7};
  border-radius: 4px;
  width: 100%;
`;

export const ToggleCaretBox = styled('div')`
  color: ${colors.lavenderWeb};
  padding: 4px;
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 8px;
  background: ${colors.lavenderWeb8};
  border: 1px solid ${colors.lavenderWeb7};
  transition: background 200ms ease-in;

  &:hover {
    background: ${colors.lavenderWeb6};
  }
`;
