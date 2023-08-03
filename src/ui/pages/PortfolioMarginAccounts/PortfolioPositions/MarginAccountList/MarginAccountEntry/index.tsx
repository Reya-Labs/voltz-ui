import { ColorTokens, TokenTypography, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { MarginAccountUI } from '../../../../../../app/features/portfolio/types';
import { useResponsiveQuery } from '../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../components/ChainIcon';
import { TestNetIndicator } from '../../../../../components/TestNetIndicator';
import {
  BalanceBox,
  ChainIconAndNameContainer,
  LeftBox,
  MarginAccountEntryBox,
  MarginAccountEntryBoxWrapper,
  MarginRatioBox,
  PositionsCountBox,
  RightBox,
  TestPillContainer,
  ViewDetailsBox,
  ViewDetailsButton,
} from './MarginAccountEntry.styled';
import { MarginRatioDonut } from './MarginRatioDonut';

type MarginAccountEntryProps = MarginAccountUI & {
  backgroundColorToken: ColorTokens;
};

export const MarginAccountEntry = React.forwardRef<HTMLDivElement, MarginAccountEntryProps>(
  (
    {
      backgroundColorToken,
      id,
      positionsCount,
      marginRatioHealth,
      marginRatioPercentage,
      chainId,
      name,
      balanceCompactFormat,
    },
    ref,
  ) => {
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

    const handleOnEntryClick = () => {
      alert('todo');
    };
    const handleOnViewDetailsClick = () => {
      alert('todo');
    };

    const chainIcon = <ChainIcon chainId={chainId} hideForChains={[]} />;
    const testNetIndicator = <TestNetIndicator chainId={chainId} />;
    return (
      <React.Fragment>
        <MarginAccountEntryBoxWrapper ref={ref} onClick={handleOnEntryClick}>
          {testNetIndicator ? <TestPillContainer>{testNetIndicator}</TestPillContainer> : null}
          <MarginAccountEntryBox backgroundColorToken={backgroundColorToken}>
            <LeftBox>
              <ChainIconAndNameContainer>
                {chainIcon}
                <Typography colorToken="lavenderWeb" typographyToken={textsTypographyToken}>
                  {name}
                </Typography>
              </ChainIconAndNameContainer>
            </LeftBox>
            <RightBox>
              <BalanceBox>
                <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
                  Balance
                </Typography>
                <TokenTypography
                  colorToken="lavenderWeb"
                  prefixToken="$"
                  token={balanceCompactFormat.compactSuffix}
                  typographyToken={numbersTypographyToken}
                  value={balanceCompactFormat.compactNumber}
                />
              </BalanceBox>
              <PositionsCountBox>
                <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
                  Positions
                </Typography>
                <Typography colorToken="lavenderWeb" typographyToken={numbersTypographyToken}>
                  {positionsCount}
                </Typography>
              </PositionsCountBox>
              <MarginRatioBox>
                <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
                  Margin Ratio
                </Typography>
                <Typography colorToken="lavenderWeb" typographyToken={numbersTypographyToken}>
                  {marginRatioPercentage}%
                </Typography>
                <MarginRatioDonut health={marginRatioHealth} percentage={marginRatioPercentage} />
              </MarginRatioBox>
              <ViewDetailsBox>
                <ViewDetailsButton
                  typographyToken={textsTypographyToken}
                  variant="secondary"
                  onClick={handleOnViewDetailsClick}
                >
                  View Details
                </ViewDetailsButton>
              </ViewDetailsBox>
            </RightBox>
          </MarginAccountEntryBox>
        </MarginAccountEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
