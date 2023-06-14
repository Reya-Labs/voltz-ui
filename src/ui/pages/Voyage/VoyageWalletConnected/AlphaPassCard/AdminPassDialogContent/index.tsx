import { Button, CloseButton, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  claimAdmitPassThunk,
  selectAdmitPassClaimFlowError,
  selectAdmitPassClaimFlowStatus,
  selectAdmitPassTotalPasses,
} from '../../../../../../app/features/admit-pass-claim-flow';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { useWallet } from '../../../../../../hooks/useWallet';
import { ContentBox, DetailBox, TitleBox } from './AdminPassDialogContent.styled';

export const AdminPassDialogContent: React.FunctionComponent<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAdmitPassClaimFlowError);
  const loading = useAppSelector(selectAdmitPassClaimFlowStatus) === 'pending';
  const totalPasses = useAppSelector(selectAdmitPassTotalPasses);
  const handleOnVerifyClick = useCallback(() => {
    if (!signer) {
      return;
    }
    void dispatch(
      claimAdmitPassThunk({
        signer,
      }),
    );
  }, [signer, dispatch]);

  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="rainbow" typographyToken="primaryHeader3Bold">
          Voltz v2 Alpha Pass
        </Typography>
        <CloseButton onClick={onClose} />
      </TitleBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        With this pass, you have early access to trade. For each pass you transfer to a friend, they
        also gain early access to trade, and their trades will benefit you later on. No friends? No
        worries. You can always list the pass for sale.
      </Typography>
      <DetailBox>
        <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
          Total Passes
        </Typography>
        <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
          {totalPasses}
        </Typography>
      </DetailBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        disabled={loading}
        loading={loading}
        variant="primary"
        onClick={handleOnVerifyClick}
      >
        Mint
      </Button>
    </ContentBox>
  );
};
