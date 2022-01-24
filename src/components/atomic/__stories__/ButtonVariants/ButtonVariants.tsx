import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Themes, themes, Agents } from '@theme';
import Button from '../../Button/Button';
import Typography from '../../Typography/Typography';

export type ButtonVariantsProps = {};

const ButtonVariants: FunctionComponent<ButtonVariantsProps> = ({}) => {
  return (
    <Box>
      {(Object.keys(Themes) as Array<keyof typeof Themes>).map((key) => {
        const themeName = Themes[key];

        return (
          <ThemeProvider theme={themes[themeName]}>
            <Box>
              <Typography>Theme: {themeName}</Typography>
              <Container>
                <Button agent={Agents.FIXED_TRADER}>{Agents.FIXED_TRADER}</Button>
              </Container>
            </Box>
          </ThemeProvider>
        );
      })}
    </Box>
  );
};

export default ButtonVariants;
