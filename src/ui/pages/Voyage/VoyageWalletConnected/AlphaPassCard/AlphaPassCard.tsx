import { Dialog, Pill } from 'brokoli-ui';
import React from 'react';

import {
  closeClaimDialogAction,
  openClaimDialogAction,
  selectAdmitPassClaimFlowStep,
  selectAdmitPassTotalPasses,
} from '../../../../../app/features/admit-pass-claim-flow';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { isV2Live } from '../../../../../utilities/is-v2-live';
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
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectAdmitPassClaimFlowStep);
  const totalPasses = useAppSelector(selectAdmitPassTotalPasses(account!));

  const handleOnClaimAllClick = () => {
    dispatch(openClaimDialogAction());
  };
  const handleOnClose = () => {
    dispatch(closeClaimDialogAction());
  };
  if (!isV2Live() || totalPasses === 0) {
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
            disabled={step === 'claimed'}
            variant="primary"
            onClick={handleOnClaimAllClick}
          >
            {step !== 'claimed' ? 'Claim all' : 'Claimed'}
          </ClaimButtonStyled>
        </ButtonBox>
      </Container>
    </React.Fragment>
  );
};
