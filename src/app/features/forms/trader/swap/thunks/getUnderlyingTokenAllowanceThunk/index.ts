import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
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
  try {
    const amm = thunkAPI.getState().swapForm.amm;
    if (!amm || !amm.signer) {
      return;
    }
    if (isV1StatelessEnabled()) {
      // TODO: Artur is this correct fn? Can I not provide you with ammId only?
      return await amm.getUnderlyingTokenAllowance({
        forceErc20Check: false,
        chainId,
        alchemyApiKey: getAlchemyKey(),
        infuraApiKey: getInfuraKey(),
      });
      // return await getAllowanceToPeriphery({
      //   forceErc20Check: false,
      //   chainId,
      //   alchemyApiKey: getAlchemyKey(),
      //   infuraApiKey: getInfuraKey(),
      // });
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
