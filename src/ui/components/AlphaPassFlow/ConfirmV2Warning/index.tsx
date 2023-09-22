import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Button, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { confirmV2WarningAction } from '../../../../app/features/alpha-pass-verification-flow';
import { MAX_POOL_CAP } from '../../../../app/features/aMMs';
import { useAppDispatch } from '../../../../app/hooks';
import { useWallet } from '../../../hooks/useWallet';
import { ConfirmV2WarningBox, TitleBox } from './ConfirmV2Warning.styled';
import { PoolDetails } from './PoolDetails';

export const ConfirmV2Warning: React.FunctionComponent<{ chainId: SupportedChainId }> = ({
  chainId,
}) => {
  const { signer, account } = useWallet();
  const dispatch = useAppDispatch();
  const handleOnContinueClick = useCallback(() => {
    if (!signer || !account) {
      return;
    }
    void dispatch(
      confirmV2WarningAction({
        account,
      }),
    );
  }, [signer, account, dispatch]);

  return (
    <ConfirmV2WarningBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          You are in. Welcome to v2.
        </Typography>
      </TitleBox>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
        We want to remind you that Voltz Protocol v2 has not yet undergone an audit by an
        independent third-party. Whilst rigorous security measures and best practices have been used
        it's important to reiterate that, though you cannot ever rely on the accuracy or performance
        of any software completely, non-audited software may present heightened risks.
      </Typography>
      <PoolDetails chainId={chainId} poolCap={MAX_POOL_CAP} />
      <Button variant="primary" onClick={handleOnContinueClick}>
        Continue
      </Button>
    </ConfirmV2WarningBox>
  );
};
