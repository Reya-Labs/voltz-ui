import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ColorTokens, TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../app/features/portfolio/types';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../components/MarketTokenInformation';
import {
  ArbitrumIcon,
  AvalancheIcon,
  ChainIconContainer,
  LeftBox,
  MarginBox,
  MaturityBox,
  MiddleBox,
  NotionalBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  StatusBox,
  UnrealizedPNLBox,
} from './PositionEntry.styled';

type PositionEntryProps = {
  isAaveV3: boolean;
  isV2: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  maturityFormatted: string;
  backgroundColorToken: ColorTokens;
  borderColorToken: ColorTokens | 'transparent';
  routeAmmId: string;
  routePoolId: string;
  chainId: SupportedChainId;
  status: PositionUI['status'];
  marginCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  unrealizedPNLCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  notionalCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
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
    },
    ref,
  ) => {
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const ChainIcon = ChainIconMap[chainId];
    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyLargeRegular'
      : 'secondaryBodyMediumRegular';

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
              colorToken="lavenderWeb"
              iconSize={24}
              isAaveV3={isAaveV3}
              isBorrowing={isBorrowing}
              isV2={isV2}
              market={market}
              pillVariant="compact"
              token={token}
              typographyToken="primaryBodyLargeBold"
            />
          </LeftBox>
          <MiddleBox>
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
              <TokenTypography
                colorToken="wildStrawberry"
                token=""
                typographyToken={typographyToken}
                value={status.variant}
              />
            </StatusBox>
            <UnrealizedPNLBox>
              <TokenTypography
                colorToken="wildStrawberry"
                token={unrealizedPNLCompactFormat.compactSuffix}
                typographyToken={typographyToken}
                value={unrealizedPNLCompactFormat.compactNumber}
              />
            </UnrealizedPNLBox>
            <RealizedPNLBox>
              <TokenTypography
                colorToken="wildStrawberry"
                token={realizedPNLCompactFormat.compactSuffix}
                typographyToken={typographyToken}
                value={realizedPNLCompactFormat.compactNumber}
              />
            </RealizedPNLBox>
          </MiddleBox>
        </PositionEntryBox>
      </PositionEntryBoxWrapper>
    );
  },
);
