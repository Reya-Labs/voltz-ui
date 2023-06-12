import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateMargin } from '@voltz-protocol/sdk-v1-stateless';
import { ContractReceipt } from 'ethers';

import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';
import {
  getProspectiveLpFixedHigh,
  getProspectiveLpFixedLow,
  getProspectiveLpMargin,
} from '../../utils';

export const confirmMarginUpdateThunk = createAsyncThunk<
  Awaited<ContractReceipt | ReturnType<typeof rejectThunkWithError>>,
  void,
  { state: RootState }
>('lpForm/confirmMarginUpdate', async (_, thunkAPI) => {
  try {
    const lpFormState = thunkAPI.getState().lpForm;
    const amm = lpFormState.amm;
    const positionId = lpFormState.selectedPosition?.id;

    if (!amm || !amm.signer || !positionId) {
      return;
    }

    const fixedLow: number | null = getProspectiveLpFixedLow(lpFormState);
    const fixedHigh: number | null = getProspectiveLpFixedHigh(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }
    if (isV1StatelessEnabled()) {
      return await updateMargin({
        positionId,
        signer: amm.signer,
        margin: getProspectiveLpMargin(lpFormState),
      });
    } else {
      return await amm.updatePositionMargin({
        fixedLow,
        fixedHigh,
        marginDelta: getProspectiveLpMargin(lpFormState),
      });
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
