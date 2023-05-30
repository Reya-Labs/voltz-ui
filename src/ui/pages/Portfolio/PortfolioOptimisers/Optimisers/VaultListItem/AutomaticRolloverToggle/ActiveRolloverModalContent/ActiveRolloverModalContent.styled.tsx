import { styled } from '@mui/material/styles';

export const ContentBox = styled('div')`
  display: flex;
  box-sizing: border-box;
  width: 316px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;

export const GasCostBox = styled('div')`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;

export const ButtonBox = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
`;
