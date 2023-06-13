import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllowanceToPeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { getAllowanceToPeriphery as getAllowanceToPeripheryV2 } from '@voltz-protocol/sdk-v2';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isV2AMM } from '../../../../../../../utilities/amm';
import { getAlchemyKey } from '../../../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../../../utilities/getInfuraKey';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const getUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
>('rolloverLpForm/getUnderlyingTokenAllowance', async ({ chainId }, thunkAPI) => {
  try {
    const amm = thunkAPI.getState().rolloverLpForm.amm;
    if (!amm || !amm.signer) {
      return;
    }
    if (isV2AMM(amm)) {
      return await getAllowanceToPeripheryV2({
        ammId: amm.id,
        signer: amm.signer,
      });
    } else {
      if (isV1StatelessEnabled()) {
        return await getAllowanceToPeriphery({
          ammId: amm.id,
          signer: amm.signer,
        });
      } else {
        return await amm.getUnderlyingTokenAllowance({
          forceErc20Check: false,
          chainId,
          alchemyApiKey: getAlchemyKey(),
          infuraApiKey: getInfuraKey(),
        });
      }
    }
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
});
