import { Button, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectAdmitPassVerificationFlowError,
  selectAdmitPassVerificationFlowStatus,
  verifyAdmitPassThunk,
} from '../../../../app/features/admit-pass-verification-flow';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useWallet } from '../../../../hooks/useWallet';
import { PoolDetails } from './PoolDetails';
import { TitleBox, VerifyStepBox } from './VerifyStep.styled';

export const VerifyStep: React.FunctionComponent<{
  poolCap: number;
}> = ({ poolCap }) => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAdmitPassVerificationFlowError);
  const loading = useAppSelector(selectAdmitPassVerificationFlowStatus) === 'pending';
  const handleOnVerifyClick = useCallback(() => {
    if (!signer) {
      return;
    }
    void dispatch(
      verifyAdmitPassThunk({
        signer,
      }),
    );
  }, [signer, dispatch]);

  return (
    <VerifyStepBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Verify your Admit Pass
        </Typography>
      </TitleBox>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
        In order to start trading on Voltz v2 you need to verify ownership of the Voltz Admin Pass.
      </Typography>
      <Typography colorToken="rainbow" typographyToken="primaryBodyXSmallRegular">
        Voltz v2 Alpha Launch
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
