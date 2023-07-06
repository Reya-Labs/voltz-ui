import { InfoPostSettlePosition } from '@voltz-protocol/v1-sdk';

import { PositionDetailsUI } from '../position-details';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  position: PositionDetailsUI | null;
  step: 'confirmation' | 'waitingForConfirmation' | 'completed' | null;
  error: string | null;
  txHash: string | null;
  infoPostSettlePosition: {
    value: InfoPostSettlePosition;
    status: ThunkStatus;
  };
};
