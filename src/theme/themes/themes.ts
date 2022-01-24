import dark from './dark';
import light from './light';
import { Themes } from './constants';

const themes = {
  [Themes.DARK]: dark,
  [Themes.LIGHT]: light,
};

export default themes;
