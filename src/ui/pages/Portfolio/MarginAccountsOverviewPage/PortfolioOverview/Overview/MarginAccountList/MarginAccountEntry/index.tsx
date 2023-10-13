import { ColorTokens, ToggleCaret, Typography, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { MarginAccountUI } from '../../../../../../../../app/features/portfolio/types';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { MarginRatioDonut } from '../../../../../../../components/MarginRatioDonut';
import { TestNetIndicator } from '../../../../../../../components/TestNetIndicator';
import { TokenCompactTypography } from '../../../../../../../components/TokenCompactTypography';
import { useAppNavigate } from '../../../../../../../hooks/useAppNavigate';
import { useResponsiveQuery } from '../../../../../../../hooks/useResponsiveQuery';
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
  ToggleCaretBox,
  ViewDetailsBox,
  ViewDetailsButton,
} from './MarginAccountEntry.styled';
import { PositionsList } from './PositionsList';

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
      balanceCompactFormatted,
      balanceUSDCompactFormatted,
      settlementToken,
    },
    ref,
  ) => {
    const [isPositionListShown, setIsPositionListShown] = useState(false);
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';
    const { toMarginAccountDetailsPage } = useAppNavigate();
    const handleOnEntryClick = () => {
      setIsPositionListShown(!isPositionListShown);
    };
    const handleOnViewDetailsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      toMarginAccountDetailsPage({ marginAccountId: id });
    };

    const chainIcon = <ChainIcon chainId={chainId} hideForChains={[]} />;
    const testNetIndicator = <TestNetIndicator chainId={chainId} />;
    return (
      <MarginAccountEntryBoxWrapper ref={ref}>
        {testNetIndicator ? <TestPillContainer>{testNetIndicator}</TestPillContainer> : null}
        <MarginAccountEntryBox
          backgroundColorToken={backgroundColorToken}
          isPositionListShown={isPositionListShown}
          onClick={handleOnEntryClick}
        >
          <LeftBox>
            <ChainIconAndNameContainer>
              {chainIcon}
              <Typography colorToken="lavenderWeb" typographyToken={textsTypographyToken}>
                {name}
              </Typography>
              <ToggleCaretBox>
                <ToggleCaret isOpen={isPositionListShown} />
              </ToggleCaretBox>
            </ChainIconAndNameContainer>
          </LeftBox>
          <RightBox>
            <BalanceBox>
              <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
                Balance
              </Typography>
              <TokenCompactTypography
                colorToken="lavenderWeb"
                compactData={
                  !settlementToken ? balanceUSDCompactFormatted : balanceCompactFormatted
                }
                token={!settlementToken ? '$' : settlementToken}
                typographyToken={numbersTypographyToken}
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
        <PositionsList isShown={isPositionListShown} marginAccountId={id} />
      </MarginAccountEntryBoxWrapper>
    );
  },
);
