import { routes } from '@routes';
import { SwapFormModes } from '@components/interface';

/**
 * Returns the current view mode to render
 * @param formMode - The form mode (this is only set if a pool / position has been selected)
 * @param pathnameWithoutPrefix - The route pathname without prefix
 */
export const getRenderMode = (formMode: SwapFormModes | undefined, pathnameWithoutPrefix: string) => {
  if (!formMode) {
    if (pathnameWithoutPrefix === routes.SWAP) {
      return 'pools';
    } else {
      return 'portfolio';
    }
  }

  return 'form'
};