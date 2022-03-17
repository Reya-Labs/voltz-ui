import { useContext } from 'react';

import { AMMContext, AMMDispatch } from '@components/contexts';

const useAMMContext = (): AMMDispatch => {
  return useContext(AMMContext);
};

export default useAMMContext;
