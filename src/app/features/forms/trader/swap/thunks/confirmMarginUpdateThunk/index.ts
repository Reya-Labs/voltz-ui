import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import { getProspectiveSwapMargin } from '../../utils';

export const confirmMarginUpdateThunkHandler: AsyncThunkPayloadCreator<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
> = async (_, thunkAPI) => {
  try {
    const swapFormState = thunkAPI.getState().swapForm;
    const amm = swapFormState.amm;
    if (!amm) {
      return;
    }
    if (isV1StatelessEnabled()) {
      return await amm.updatePositionMargin({
        fixedLow: 1,
        fixedHigh: 999,
        marginDelta: getProspectiveSwapMargin(swapFormState),
      });
      // TODO: Artur align here...
      // return await updateMargin({
      //   fixedLow: 1,
      //   fixedHigh: 999,
      //   marginDelta: getProspectiveSwapMargin(swapFormState),
      // });
    } else {
      return await amm.updatePositionMargin({
        fixedLow: 1,
        fixedHigh: 999,
        marginDelta: getProspectiveSwapMargin(swapFormState),
      });
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('swapForm/confirmMarginUpdate', confirmMarginUpdateThunkHandler);
