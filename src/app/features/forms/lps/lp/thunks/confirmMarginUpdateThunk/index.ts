import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateMargin } from '@voltz-protocol/sdk-v1-stateless';
import { updateMargin as updateMarginV2 } from '@voltz-protocol/sdk-v2/dist/types/services/updateMargin/updateMargin';
import { ContractReceipt } from 'ethers';

import { isV2AMM } from '../../../../../../../utilities/amm';
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
    const prospectiveSwapMargin = getProspectiveLpMargin(lpFormState);

    if (fixedLow === null || fixedHigh === null) {
      return;
    }

    if (isV2AMM(amm)) {
      return await updateMarginV2({
        positionId,
        signer: amm.signer,
        margin: prospectiveSwapMargin,
      });
    } else {
      if (isV1StatelessEnabled()) {
        return await updateMargin({
          positionId,
          signer: amm.signer,
          margin: prospectiveSwapMargin,
        });
      } else {
        return await amm.updatePositionMargin({
          fixedLow,
          fixedHigh,
          marginDelta: prospectiveSwapMargin,
        });
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
