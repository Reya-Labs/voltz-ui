import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { SEASONS } from '../../../../../hooks/season/constants';
import { Season } from '../../../../../hooks/season/types';
import { BadgeVariant, CHAIN_SEASON_BADGE_VARIANTS } from '../../data/getSeasonBadges';
import { ClaimButtonProps } from '../ClaimButton/ClaimButton';
import { CopyLinkButtonProps } from '../CopyLinkButton/CopyLinkButton';
import {
  ProfilePageWalletConnected,
  ProfilePageWalletConnectedProps,
} from './ProfilePageWalletConnected';
import { mockBadges, mockBadgesArbitrum } from './ProfilePageWalletConnected.mocks';

export default {
  title: 'Interface/ProfilePageWalletConnected',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => {
  const [copyLinkButtonMode, setCopyLinkButtonMode] = useState<CopyLinkButtonProps['mode']>('copy');
  const [season, setSeason] = useState<Season>(args.season);
  const [claimButtonBulkMode, setClaimButtonBulkMode] = useState<ClaimButtonProps['mode']>('claim');
  const [achievedBadges, setAchievedBadges] = useState<ProfilePageWalletConnectedProps['badges']>(
    [],
  );
  const [claimButtonModes, setClaimButtonModes] = useState<
    Record<BadgeVariant, ClaimButtonProps['mode']>
  >(
    CHAIN_SEASON_BADGE_VARIANTS[args.chainId][season.id].reduce(
      (pV, cI) => ({
        ...pV,
        [cI as BadgeVariant]: 'claim',
      }),
      {} as Record<BadgeVariant, ClaimButtonProps['mode']>,
    ),
  );

  useEffect(() => {
    setAchievedBadges(
      args.chainId === SupportedChainId.mainnet
        ? mockBadges[season.id]
        : mockBadgesArbitrum[season.id],
    );
    setClaimButtonBulkMode('claim');
  }, []);

  // fake copying
  function handleOnCopyLinkButtonClick() {
    setCopyLinkButtonMode('copying');
    setTimeout(() => {
      setCopyLinkButtonMode('copied');
      setTimeout(() => {
        setCopyLinkButtonMode('copy');
      }, 1500);
    }, 3000);
  }

  function handleOnClaimButtonClick(variant: BadgeVariant) {
    setClaimButtonModes((prev) => ({
      ...prev,
      [variant]: 'claiming',
    }));
    // fake minting
    setTimeout(() => {
      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimed',
      }));
      setAchievedBadges((prev) => {
        const copy = [...prev];
        copy.forEach((b) => {
          if (b.variant === variant) {
            b.claimedAt = Date.now().valueOf();
          }
        });
        return copy;
      });
    }, 1500);
  }

  function handleOnClaimBulkClick(variants: BadgeVariant[]) {
    setClaimButtonBulkMode('claiming');
    variants.forEach((v) => handleOnClaimButtonClick(v));
  }

  return (
    <ProfilePageWalletConnected
      {...args}
      badges={achievedBadges}
      claimButtonBulkMode={claimButtonBulkMode}
      claimButtonModes={claimButtonModes}
      claimingEnabled={season.claimingEnabled}
      copyLinkButtonMode={copyLinkButtonMode}
      isOnGoingSeason={season.id === 1}
      season={season}
      seasonBadgeVariants={CHAIN_SEASON_BADGE_VARIANTS[args.chainId][season.id]}
      onClaimBulkClick={handleOnClaimBulkClick}
      onClaimButtonClick={handleOnClaimButtonClick}
      onCopyLinkButtonClick={handleOnCopyLinkButtonClick}
      onSeasonChange={(newSeason) => {
        setSeason(newSeason);
        setAchievedBadges(
          args.chainId === SupportedChainId.mainnet
            ? mockBadges[newSeason.id]
            : mockBadgesArbitrum[newSeason.id],
        );
        setClaimButtonBulkMode('claim');
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  badges: mockBadges[1],
  season: SEASONS[SupportedChainId.mainnet][1],
  seasonOptions: [
    SEASONS[SupportedChainId.mainnet][0],
    SEASONS[SupportedChainId.mainnet][1],
    SEASONS[SupportedChainId.mainnet][2],
    SEASONS[SupportedChainId.mainnet][3],
  ],
  chainId: SupportedChainId.mainnet,
};

export const ArbitrumSeason = Template.bind({});
ArbitrumSeason.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  badges: mockBadgesArbitrum[3],
  season: SEASONS[SupportedChainId.arbitrum][0],
  seasonOptions: [SEASONS[SupportedChainId.arbitrum][0]],
  chainId: SupportedChainId.arbitrum,
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  badges: mockBadges[1],
  season: SEASONS[SupportedChainId.mainnet][1],
  loading: true,
  isOnGoingSeason: true,
  chainId: SupportedChainId.mainnet,
  seasonBadgeVariants: CHAIN_SEASON_BADGE_VARIANTS[SupportedChainId.mainnet][1],
  seasonOptions: [SEASONS[SupportedChainId.mainnet][0], SEASONS[SupportedChainId.mainnet][1]],
};
