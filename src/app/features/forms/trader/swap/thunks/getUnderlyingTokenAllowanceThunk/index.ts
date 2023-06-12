import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllowanceToPeriphery } from '@voltz-protocol/sdk-v1-stateless';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getAlchemyKey } from '../../../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../../../utilities/getInfuraKey';
import { isV1StatelessEnabled } from '../../../../../../../utilities/isEnvVarProvided/is-v1-stateless-enabled';
import { RootState } from '../../../../../../store';
import { rejectThunkWithError } from '../../../../../helpers/reject-thunk-with-error';

export const getUnderlyingTokenAllowanceThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
> = async ({ chainId }, thunkAPI) => {
  const amm = thunkAPI.getState().swapForm.amm;
  if (!amm || !amm.signer) {
    return;
  }

  try {
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
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};
export const getUnderlyingTokenAllowanceThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  { chainId: SupportedChainId },
  { state: RootState }
>('swapForm/getUnderlyingTokenAllowance', getUnderlyingTokenAllowanceThunkHandler);
