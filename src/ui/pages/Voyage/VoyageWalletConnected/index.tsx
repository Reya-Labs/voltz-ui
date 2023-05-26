import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Dialog, formatEthereumAddress, Typography } from 'brokoli-ui';
import React, { useEffect, useRef, useState } from 'react';

import {
  fetchVoyageBadgesThunk,
  selectVoyageBadges,
  selectVoyageBadgesStatus,
} from '../../../../app/features/voyage';
import { VoyageBadgeUI } from '../../../../app/features/voyage/types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { routes } from '../../../../routes/paths';
import { GenericError } from '../../../components/GenericError';
import { BadgeCard, BadgeCardHandle } from './BadgeCard/BadgeCard';
import { LearnMoreAboutVoyage } from './LearnMoreAboutVoyage';
import { NotificationSection } from './NotificationSection';
import { VoyageBadgeEntry } from './VoyageBadgeEntry';
import {
  BadgeCollectionBox,
  BadgesBox,
  BadgesListGrid,
  BadgesListSubheading,
  ContainerBox,
  Subheading,
  VoyageBadgesGrid,
  VoyageBadgesListBox,
} from './VoyageWalletConnected.styled';

type VoyagePageWalletConnectedProps = {
  account: string;
  accountENS: string;
  chainId: SupportedChainId;
};

export const VoyageWalletConnected: React.FunctionComponent<VoyagePageWalletConnectedProps> = ({
  account,
  accountENS,
  chainId,
}) => {
  const badgeCardRefs = useRef<Record<string, BadgeCardHandle>>({});
  const dispatch = useAppDispatch();
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const openLearnMoreModal = () => setIsLearnMoreOpen(true);
  const closeLearnMoreModal = () => setIsLearnMoreOpen(false);

  useEffect(() => {
    const learnMoreOpenedBefore = localStorage.getItem('learnMoreOpenedBefore');
    if (!learnMoreOpenedBefore) {
      openLearnMoreModal();
      localStorage.setItem('learnMoreOpenedBefore', 'true');
    }
  }, []);
  useEffect(() => {
    void dispatch(
      fetchVoyageBadgesThunk({
        chainId,
        account,
      }),
    );
  }, [dispatch, chainId, account]);

  const status = useAppSelector(selectVoyageBadgesStatus(account));
  const error = status === 'failed';
  const loading = status !== 'succeeded';
  const badges = useAppSelector(selectVoyageBadges(account));

  const handleSmoothScroll = React.useCallback((id: VoyageBadgeUI['id']) => {
    badgeCardRefs.current[id]?.scrollIntoView();
  }, []);

  if (error) {
    return (
      <ContainerBox>
        <GenericError to={`/${routes.POOLS}`} />
      </ContainerBox>
    );
  }
  return (
    <ContainerBox>
      <Dialog open={isLearnMoreOpen}>
        <LearnMoreAboutVoyage onCloseButtonClick={closeLearnMoreModal} />
      </Dialog>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
        {`Welcome to the Voyage ${formatEthereumAddress(accountENS)}`}
      </Typography>
      <Subheading
        colorToken="lavenderWeb2"
        data-testid="Voyage-VoyageExplained"
        typographyToken="primaryBodyMediumRegular"
      >
        We’re thrilled to announce an exciting new venture - Voyages. Voyages can start and finish
        at any time, providing a short period within which unique Soul-Bound-Tokens (aka Badges) can
        be earned.
        <br />
        <br />
        These unique badges will have a number of mysterious benefits. Learn more below, and
        check-in to see whether you’ve met the criteria for active Voyages.
      </Subheading>
      <NotificationSection onLearnMoreClick={openLearnMoreModal} />
      <BadgesBox>
        <BadgeCollectionBox data-testid="Voyage-BadgeCollectionBox">
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
            Voltz v2 Voyage
          </Typography>
          <VoyageBadgesGrid itemsPerRow={3}>
            {loading &&
              Array.from({ length: 4 }, (index) => index).map((_, index) => (
                <BadgeCard key={index} id={1} loading={loading} status="notAchieved" />
              ))}
            {!loading &&
              badges.length !== 0 &&
              badges.map((badge, index) => (
                <BadgeCard
                  key={`${badge.id}${index}`}
                  ref={(ref: BadgeCardHandle) => (badgeCardRefs.current[badge.id] = ref)}
                  id={badge.id}
                  loading={loading}
                  status={badge.status}
                />
              ))}
          </VoyageBadgesGrid>
        </BadgeCollectionBox>
        <VoyageBadgesListBox data-testid="Voyage-AchievedBadgesListBox">
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
            Your Voyage Collection
          </Typography>
          <BadgesListSubheading
            colorToken="lavenderWeb2"
            typographyToken="primaryBodyMediumRegular"
          >
            Trade or LP on the protocol to earn unique Voyage badges.
          </BadgesListSubheading>
          <BadgesListGrid data-testid="Voyage-AchievedBadgesListGrid" itemsPerRow={1}>
            {loading
              ? Array.from({ length: 4 }, (index) => index).map((_, index) => (
                  <VoyageBadgeEntry
                    key={index}
                    achievedAt={undefined}
                    loading={loading}
                    variant={1}
                  />
                ))
              : null}
            {!loading
              ? badges.map(({ id, achievedAt }, index) => (
                  <VoyageBadgeEntry
                    key={index}
                    achievedAt={achievedAt}
                    loading={loading}
                    variant={id}
                    onClick={() => handleSmoothScroll(id)}
                  />
                ))
              : null}
          </BadgesListGrid>
        </VoyageBadgesListBox>
      </BadgesBox>
    </ContainerBox>
  );
};
