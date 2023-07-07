import { RootState } from '../../store';

export const selectRedirects = (state: RootState) => {
  return state.redirects.redirects;
};
