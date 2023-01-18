import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const BackgroundBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background: linear-gradient(152.9deg, #231d40 0%, #151126 52.6%, #201a3a 100%);
  width: 100vw;
  height: 100vh;
  position: fixed;
  box-sizing: border-box;
`;

export const BackgroundNeonsBox = styled(Box)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;
