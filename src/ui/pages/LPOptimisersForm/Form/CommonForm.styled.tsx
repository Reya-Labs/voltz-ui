import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

export const FormBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  background: ${colors.liberty6};
  border-radius: 8px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const FullButtonBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 8px;

  align-self: stretch;
`;

export const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 100%;
`;
