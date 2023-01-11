import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

export const SubLinksButtonGroup = styled(ButtonGroup)`
  & .MuiButtonGroup-grouped:not(:last-of-type):hover {
    border-bottom-color: transparent;
  }

  & .MuiButtonGroup-grouped:not(:last-of-type) {
    text-decoration: none;
    border-radius: 8px;
    border-bottom-color: transparent;
  }

  & .MuiButtonGroup-grouped:not(:first-of-type) {
    text-decoration: none;
    border-radius: 8px;
    border-bottom-color: transparent;
  }
`;
