import { MarketToken, MarketTokenProps, Pill, PillProps, ToggleCaret } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox, ToggleCaretBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
  isV2: boolean;
  pillVariant: PillProps['variant'];
  colorToken: MarketTokenProps['colorToken'];
  iconSize: MarketTokenProps['iconSize'];
  typographyToken: MarketTokenProps['typographyToken'];
  showToggleCaret?: boolean;
  isToggleCaretOpen?: boolean;
  onToggleCaretClick?: () => void;
};

export const MarketTokenInformation: React.FunctionComponent<MarketTokenInformationProps> = ({
  market,
  token,
  isBorrowing,
  isAaveV3,
  isV2,
  typographyToken,
  colorToken,
  iconSize,
  pillVariant,
  showToggleCaret,
  onToggleCaretClick,
  isToggleCaretOpen,
}) => {
  return (
    <MarketTokenBox data-testid="MarketTokenInformation-MarketTokenBox">
      <MarketToken
        colorToken={colorToken}
        data-testid="MarketTokenInformation-MarketToken"
        iconSize={iconSize}
        market={market}
        token={token}
        typographyToken={typographyToken}
      />
      {showToggleCaret ? (
        <ToggleCaretBox onClick={onToggleCaretClick}>
          <ToggleCaret isOpen={Boolean(isToggleCaretOpen)} />
        </ToggleCaretBox>
      ) : null}
      {isBorrowing ? (
        <Pill
          colorToken="wildStrawberry"
          data-testid="MarketTokenInformation-PillBorrowing"
          typographyToken="primaryBodySmallRegular"
          variant={pillVariant}
        >
          Borrow
        </Pill>
      ) : null}
      {isAaveV3 ? (
        <Pill
          colorToken="wildStrawberry"
          data-testid="MarketTokenInformation-PillAaveV3"
          typographyToken="primaryBodySmallRegular"
          variant={pillVariant}
        >
          Aave v3
        </Pill>
      ) : null}
      {isV2 ? (
        <Pill
          colorToken="rainbow"
          data-testid="MarketTokenInformation-PillV2"
          typographyToken="primaryBodySmallRegular"
          variant={pillVariant}
        >
          v2
        </Pill>
      ) : null}
    </MarketTokenBox>
  );
};
