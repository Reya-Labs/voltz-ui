import dark from './dark';
import light from './light';
import { Theme } from '@mui/material/styles';

const themes: Record<'light' | 'dark', Theme> = {
  dark: dark,
  light: light,
};

export default themes;
