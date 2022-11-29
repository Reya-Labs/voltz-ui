import { Theme } from '@mui/material/styles';

import dark from './dark';
import light from './light';

const themes: Record<'light' | 'dark', Theme> = {
  dark: dark,
  light: light,
};

export default themes;
