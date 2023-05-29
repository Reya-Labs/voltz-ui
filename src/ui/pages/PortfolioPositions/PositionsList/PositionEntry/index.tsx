import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ColorTokens, TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../app/features/portfolio/types';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { MarketTokenInformation, MarketTokenInformationProps } from './MarketTokenInformation';
import {
  ArbitrumIcon,
  AvalancheIcon,
  ChainIconContainer,
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  StatusBox,
  UnrealizedPNLBox,
} from './PositionEntry.styled';
import { PositionStatus } from './PositionStatus';

type PositionEntryProps = {
  isAaveV3: PositionUI['isAaveV3'];
  isV2: PositionUI['isV2'];
  isBorrowing: PositionUI['isBorrowing'];
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  maturityFormatted: PositionUI['maturityFormatted'];
  backgroundColorToken: ColorTokens;
  borderColorToken: ColorTokens | 'transparent';
  routeAmmId: PositionUI['routeAmmId'];
  routePoolId: PositionUI['routePoolId'];
  chainId: SupportedChainId;
  status: PositionUI['status'];
  type: PositionUI['type'];
  marginCompactFormat: PositionUI['marginCompactFormat'];
  unrealizedPNLCompactFormat: PositionUI['unrealizedPNLCompactFormat'];
  realizedPNLCompactFormat: PositionUI['realizedPNLCompactFormat'];
  notionalCompactFormat: PositionUI['notionalCompactFormat'];
};
const ChainIconMap: Record<SupportedChainId, React.FunctionComponent | null> = {
  [SupportedChainId.mainnet]: null,
  [SupportedChainId.goerli]: null,
  [SupportedChainId.arbitrum]: ArbitrumIcon,
  [SupportedChainId.arbitrumGoerli]: ArbitrumIcon,
  [SupportedChainId.avalanche]: AvalancheIcon,
  [SupportedChainId.avalancheFuji]: AvalancheIcon,
};
export const PositionEntry = React.forwardRef<HTMLDivElement, PositionEntryProps>(
  (
    {
      chainId,
      isAaveV3,
      isBorrowing,
      market,
      token,
      maturityFormatted,
      backgroundColorToken,
      routePoolId,
      routeAmmId,
      status,
      isV2,
      borderColorToken,
      marginCompactFormat,
      notionalCompactFormat,
      realizedPNLCompactFormat,
      unrealizedPNLCompactFormat,
      type,
    },
    ref,
  ) => {
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const ChainIcon = ChainIconMap[chainId];
    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';

    return (
      <PositionEntryBoxWrapper ref={ref}>
        {ChainIcon ? (
          <ChainIconContainer>
            <ChainIcon />
          </ChainIconContainer>
        ) : null}
        <PositionEntryBox
          backgroundColorToken={backgroundColorToken}
          borderColorToken={borderColorToken}
        >
          <LeftBox>
            <MarketTokenInformation
              isAaveV3={isAaveV3}
              isBorrowing={isBorrowing}
              market={market}
              token={token}
              type={type}
            />
          </LeftBox>
          <NotionalBox>
            <TokenTypography
              colorToken="lavenderWeb"
              token={notionalCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={notionalCompactFormat.compactNumber}
            />
          </NotionalBox>
          <MarginBox>
            <TokenTypography
              colorToken="lavenderWeb"
              token={marginCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={marginCompactFormat.compactNumber}
            />
          </MarginBox>
          <MaturityBox>
            <TokenTypography
              colorToken="lavenderWeb"
              token=""
              typographyToken={typographyToken}
              value={maturityFormatted}
            />
          </MaturityBox>
          <StatusBox>
            <PositionStatus status={status} typographyToken={typographyToken} />
          </StatusBox>
          <UnrealizedPNLBox>
            <TokenTypography
              colorToken={
                unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1
                  ? 'skyBlueCrayola'
                  : 'wildStrawberry'
              }
              prefixToken={
                unrealizedPNLCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'
              }
              token={unrealizedPNLCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={unrealizedPNLCompactFormat.compactNumber.replace('-', '')}
            />
          </UnrealizedPNLBox>
          <RealizedPNLBox>
            <TokenTypography
              colorToken={
                realizedPNLCompactFormat.compactNumber.indexOf('-') === -1
                  ? 'skyBlueCrayola'
                  : 'wildStrawberry'
              }
              prefixToken={realizedPNLCompactFormat.compactNumber.indexOf('-') === -1 ? '+$' : '-$'}
              token={realizedPNLCompactFormat.compactSuffix}
              typographyToken={typographyToken}
              value={realizedPNLCompactFormat.compactNumber.replace('-', '')}
            />
          </RealizedPNLBox>
        </PositionEntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
