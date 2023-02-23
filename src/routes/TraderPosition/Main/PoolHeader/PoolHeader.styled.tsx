import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const PoolHeaderBox = styled('div')`
  box-sizing: border-box;
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px 0px 0px;

  border-bottom: 1px solid ${colors.lavenderWeb8};
`;

export const PoolHeaderDetailsBox = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 24px;
  gap: 12px;
  height: 54px;
`;

export const FixedBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${colors.lavenderWeb7};
`;

export const VariableBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  border-right: 1px solid ${colors.lavenderWeb7};
`;

export const MaturityBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
