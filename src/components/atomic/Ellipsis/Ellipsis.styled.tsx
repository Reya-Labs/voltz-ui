import { keyframes, styled } from '@mui/material/styles';

const ellipsisAnimation = keyframes`
  0% {
    content: '.  ';
  }
  33% {
    content: '.. ';
  }
  66% {
    content: '...';
  }
`;

export const EllipsisTypography = styled('span')`
  white-space: pre;
  :after {
    animation: ${ellipsisAnimation} 900ms infinite ease-in-out;
    content: '.  ';
  }
`;
