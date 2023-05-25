import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { ColorTokens, Pill, TokenTypography, TypographyToken } from 'brokoli-ui';
import React, { useEffect, useState } from 'react';

import {
  selectChainChangeState,
  selectChainId,
  setChainIdThunk,
} from '../../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useAppNavigate } from '../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../components/MarketTokenInformation';
import {
  ArbitrumIcon,
  AvalancheIcon,
  ButtonStyled,
  ChainIconContainer,
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PoolEntryBox,
  PoolEntryBoxWrapper,
  RightBox,
  TestPillContainer,
  VariableAPYBox,
} from './PoolEntry.styled';

type PoolEntryProps = {
  isAaveV3: boolean;
  isV2: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  fixedRateFormatted: string;
  variableRate24hDelta: number | undefined;
  variableRateFormatted: string;
  aMMMaturity: string;
  backgroundColorToken: ColorTokens;
  borderColorToken: ColorTokens | 'transparent';
  routeAmmId: string;
  routePoolId: string;
  chainId: SupportedChainId;
};
const ChainIconMap: Record<SupportedChainId, React.FunctionComponent | null> = {
  [SupportedChainId.mainnet]: null,
  [SupportedChainId.goerli]: null,
  [SupportedChainId.arbitrum]: ArbitrumIcon,
  [SupportedChainId.arbitrumGoerli]: ArbitrumIcon,
  [SupportedChainId.avalanche]: AvalancheIcon,
  [SupportedChainId.avalancheFuji]: AvalancheIcon,
};
const TestNetMap: Record<SupportedChainId, boolean> = {
  [SupportedChainId.mainnet]: false,
  [SupportedChainId.goerli]: true,
  [SupportedChainId.arbitrum]: false,
  [SupportedChainId.arbitrumGoerli]: true,
  [SupportedChainId.avalanche]: false,
  [SupportedChainId.avalancheFuji]: true,
};
export const PoolEntry = React.forwardRef<HTMLDivElement, PoolEntryProps>(
  (
    {
      chainId: poolChainId,
      isAaveV3,
      isBorrowing,
      market,
      token,
      fixedRateFormatted,
      variableRate24hDelta,
      variableRateFormatted,
      aMMMaturity,
      backgroundColorToken,
      routePoolId,
      routeAmmId,
      isV2,
      borderColorToken,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const [waitingOnNetworkChange, setWaitingOnNetworkChange] = useState<
      null | 'lpForm' | 'swapForm'
    >(null);
    const chainId = useAppSelector(selectChainId);
    const chainStateChangeError = useAppSelector(selectChainChangeState) === 'error';
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const navigate = useAppNavigate();
    const ChainIcon = ChainIconMap[poolChainId];
    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyLargeRegular'
      : 'secondaryBodyMediumRegular';
    const promptForNetworkChange = chainId !== null ? chainId !== poolChainId : false;

    const switchNetwork = (form: 'lpForm' | 'swapForm') => {
      setWaitingOnNetworkChange(form);
      void dispatch(
        setChainIdThunk({
          chainId: poolChainId,
          isSupportedChain: true,
          triggerApprovalFlow: true,
        }),
      );
    };

    useEffect(() => {
      if (chainStateChangeError) {
        setWaitingOnNetworkChange(null);
      }
    }, [chainStateChangeError]);
    useEffect(() => {
      if (waitingOnNetworkChange === null) {
        return;
      }
      if (!chainId) {
        return;
      }
      if (chainId === poolChainId) {
        if (waitingOnNetworkChange === 'lpForm') {
          navigateToLPFormPage();
        }
        if (waitingOnNetworkChange === 'swapForm') {
          navigateToSwapFormPage();
        }
      }
    }, [poolChainId, waitingOnNetworkChange, chainId]);

    const navigateToLPFormPage = () => {
      navigate.toLPFormPage({
        ammId: routeAmmId,
        poolId: routePoolId,
      });
    };

    const handleOnLPClick = () => {
      if (!promptForNetworkChange) {
        navigateToLPFormPage();
      } else {
        switchNetwork('lpForm');
      }
    };

    const navigateToSwapFormPage = () => {
      navigate.toSwapFormPage({
        ammId: routeAmmId,
        poolId: routePoolId,
      });
    };

    const handleOnTradeClick = () => {
      if (!promptForNetworkChange) {
        navigateToSwapFormPage();
      } else {
        switchNetwork('swapForm');
      }
    };

    return (
      <PoolEntryBoxWrapper ref={ref}>
        {ChainIcon ? (
          <ChainIconContainer>
            <ChainIcon />
          </ChainIconContainer>
        ) : null}
        {TestNetMap[poolChainId] ? (
          <TestPillContainer>
            <Pill
              colorToken="skyBlueCrayola"
              typographyToken="primaryBodySmallRegular"
              variant="compact"
            >
              Testnet
            </Pill>
          </TestPillContainer>
        ) : null}
        <PoolEntryBox
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
            <FixedAPRBox>
              <TokenTypography
                colorToken="lavenderWeb"
                token="%"
                typographyToken={typographyToken}
                value={fixedRateFormatted}
              />
            </FixedAPRBox>
            <VariableAPYBox>
              <TokenTypography
                colorToken="lavenderWeb"
                differenceToken="%"
                differenceValue={variableRate24hDelta}
                token="%"
                typographyToken={typographyToken}
                value={variableRateFormatted}
              />
            </VariableAPYBox>
            <MaturityBox>
              <TokenTypography
                colorToken="lavenderWeb"
                token=""
                typographyToken={typographyToken}
                value={aMMMaturity}
              />
            </MaturityBox>
          </MiddleBox>
          <RightBox>
            <ButtonStyled
              typographyToken="primaryBodySmallBold"
              variant="primary"
              onClick={handleOnTradeClick}
            >
              Trade
            </ButtonStyled>
            <ButtonStyled
              typographyToken="primaryBodySmallBold"
              variant="secondary"
              onClick={handleOnLPClick}
            >
              LP
            </ButtonStyled>
          </RightBox>
        </PoolEntryBox>
      </PoolEntryBoxWrapper>
    );
  },
);
