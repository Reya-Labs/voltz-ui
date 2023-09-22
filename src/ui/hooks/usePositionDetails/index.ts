import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  fetchPositionDetailsThunk,
  selectPositionDetails,
  selectPositionDetailsLoadingState,
} from '../../../app/features/position-details';

export const usePositionDetails = ({ positionId }: { positionId: string }) => {
  const positionDetails = useAppSelector(selectPositionDetails(positionId));
  const positionDetailsLoadingState = useAppSelector(selectPositionDetailsLoadingState(positionId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (positionDetailsLoadingState !== 'idle') {
      return;
    }
    void dispatch(
      fetchPositionDetailsThunk({
        positionId,
      }),
    );
  }, [dispatch, positionDetailsLoadingState, positionId]);

  return {
    positionDetails,
    positionDetailsLoadingState,
  };
};
