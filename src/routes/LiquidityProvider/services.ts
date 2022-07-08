import { routes } from '@routes';
import { MintBurnFormModes } from '@contexts';

/**
 * Returns the current view mode to render
 * @param formMode - The form mode (this is only set if a pool / position has been selected)
 * @param pathnameWithoutPrefix - The route pathname without prefix
 */
export const getRenderMode = (formMode: MintBurnFormModes | undefined, pathnameWithoutPrefix: string) => {
  if (!formMode) {
    if (pathnameWithoutPrefix === routes.POOLS) {
      return 'pools';
    } else {
      return 'portfolio';
    }
  }

  return 'form'
};