import { styled } from '@mui/material/styles';

import { Button } from '../../../../atomic/Button/Button';

export const OptionButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
`;
