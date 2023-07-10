import { Button, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectAlphaPassVerificationFlowError,
  selectAlphaPassVerificationFlowStatus,
  verifyAlphaPassThunk,
} from '../../../../app/features/alpha-pass-verification-flow';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { PoolDetails } from './PoolDetails';
import { TitleBox, VerifyStepBox } from './VerifyStep.styled';

export const VerifyStep: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const { signer, account } = useWallet();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAlphaPassVerificationFlowError(account));
  const loading = useAppSelector(selectAlphaPassVerificationFlowStatus(account)) === 'pending';
  const handleOnVerifyClick = useCallback(() => {
    if (!signer || !account) {
      return;
    }
    void dispatch(
      verifyAlphaPassThunk({
        signer,
        account,
      }),
    );
  }, [signer, account, dispatch]);

  return (
    <VerifyStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Verify your Alpha Pass
        </Typography>
      </TitleBox>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
        In order to start trading on Voltz Protocol v2 you need to verify ownership of the Voltz
        Alpha Pass.
      </Typography>
      <Typography colorToken="rainbow" typographyToken="primaryBodyXSmallRegular">
        Voltz Protocol v2 Alpha Launch
      </Typography>
      <PoolDetails poolCap={poolCap} />
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        disabled={loading}
        loading={loading}
        variant="primary"
        onClick={handleOnVerifyClick}
      >
        Verify
      </Button>
    </VerifyStepBox>
  );
};
