import { createListenerMiddleware } from '@reduxjs/toolkit';
import { rearm } from '@voltz-protocol/v1-sdk';

import { getAlchemyKeyForNetwork } from '../../../utilities/get-alchemy-key-for-network';
import { setNetworkAction } from './reducer';

export const networkListenerMiddleware = createListenerMiddleware();
networkListenerMiddleware.startListening({
  actionCreator: setNetworkAction,
  effect: (action) => {
    const network = action.payload.network;
    rearm({
      network,
      alchemyApiKey: getAlchemyKeyForNetwork(network),
    });
  },
});
