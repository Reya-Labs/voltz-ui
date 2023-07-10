import { Dialog, Pill } from 'brokoli-ui';
import React, { useEffect } from 'react';

import {
  closeClaimDialogAction,
  fetchIsAlphaPassClaimedThunk,
  getAlphaPassCountThunk,
  openClaimDialogAction,
  selectAlphaPassClaimFlowStep,
  selectAlphaPassTotalPasses,
} from '../../../../../app/features/alpha-pass-claim-flow';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { AdminPassDialogContent } from './AdminPassDialogContent';
import {
  BadgeBox,
  BadgePillBox,
  ButtonBox,
  ClaimButtonStyled,
  Container,
  Icon,
} from './AlphaPassCard.styled';

type AlphaPassCardProps = {};

export const AlphaPassCard: React.FunctionComponent<AlphaPassCardProps> = () => {
  const { signer, account } = useWallet();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectAlphaPassClaimFlowStep);
  const totalPasses = useAppSelector(selectAlphaPassTotalPasses);

  useEffect(() => {
    void dispatch(
      fetchIsAlphaPassClaimedThunk({
        signer,
      }),
    );
    void dispatch(
      getAlphaPassCountThunk({
        account,
      }),
    );
  }, [account, signer]);
  const handleOnClaimAllClick = () => {
    dispatch(openClaimDialogAction());
  };
  const handleOnClose = () => {
    dispatch(closeClaimDialogAction());
  };
  if (totalPasses === 0 || totalPasses === null) {
    return null;
  }
  return (
    <React.Fragment>
      <Dialog open={step === 'claim-dialog'}>
        <AdminPassDialogContent onClose={handleOnClose} />
      </Dialog>
      <Container data-testid="AlphaPassCard">
        <BadgePillBox>
          <Pill
            colorToken="rainbow"
            data-testid="AlphaPassCard-Pill"
            typographyToken="primaryBodySmallRegular"
            variant="regular"
          >
            {`x${totalPasses}`}
          </Pill>
        </BadgePillBox>
        <BadgeBox>
          <Icon data-testid="AlphaPassCard-Icon" name="alpha-pass" />
        </BadgeBox>
        <ButtonBox>
          <ClaimButtonStyled
            disabled={
              step === 'claimed' || step === 'fetchingClaimError' || step === 'fetchingClaimStatus'
            }
            loading={step === 'fetchingClaimStatus'}
            variant="primary"
            onClick={handleOnClaimAllClick}
          >
            {step === 'fetchingClaimError'
              ? 'Cannot verify'
              : step === 'claimed'
              ? 'Claimed'
              : 'Claim all'}
          </ClaimButtonStyled>
        </ButtonBox>
      </Container>
    </React.Fragment>
  );
};
