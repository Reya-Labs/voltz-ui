import { MarketToken, MarketTokenProps, ToggleCaret } from 'brokoli-ui';
import React from 'react';

import { MarketTokenBox, ToggleCaretBox } from './MarketTokenInformation.styled';

export type MarketTokenInformationProps = {
  market: MarketTokenProps['market'];
  token: MarketTokenProps['token'];
  isBorrowing: boolean;
  isAaveV3: boolean;
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
  typographyToken,
  colorToken,
  iconSize,
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
        infoFormatter={() => (
          <React.Fragment>
            {`${market as string}${isAaveV3 ? ' v3' : ''}${
              token ? ` - ${token.toUpperCase()}` : ''
            }${isBorrowing ? ' Borrow' : ''}`}
          </React.Fragment>
        )}
        market={market}
        token={token}
        typographyToken={typographyToken}
      />
      {showToggleCaret ? (
        <ToggleCaretBox onClick={onToggleCaretClick}>
          <ToggleCaret isOpen={Boolean(isToggleCaretOpen)} />
        </ToggleCaretBox>
      ) : null}
    </MarketTokenBox>
  );
};
