import { styled } from '@mui/material/styles';
import BoxComponent from '@mui/material/Box';

export const Box = styled(BoxComponent) `
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
`;