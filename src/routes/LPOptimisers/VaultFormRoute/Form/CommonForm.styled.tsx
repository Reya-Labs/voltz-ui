import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(4)};

  background: #19152a;
  border-radius: 8px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const FullButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: ${({ theme }) => theme.spacing(2)};

  align-self: stretch;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(6)};

  width: 100%;
`;

export const BackButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #1e1933;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola};
`;
