import { ColorTokens, TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import {
  MarketTokenInformation,
  MarketTokenInformationProps,
} from '../../../../components/MarketTokenInformation';
import {
  ButtonStyled,
  FixedAPRBox,
  LeftBox,
  MaturityBox,
  MiddleBox,
  PoolEntryBox,
  RightBox,
  VariableAPYBox,
} from './PoolEntry.styled';
type PoolEntryProps = {
  isAaveV3: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  fixedRateFormatted: string;
  variableRate24hDelta: number | undefined;
  variableRateFormatted: string;
  aMMMaturity: string;
  backgroundColorToken: ColorTokens;
};

export const PoolEntry: React.FunctionComponent<PoolEntryProps> = ({
  isAaveV3,
  isBorrowing,
  market,
  token,
  fixedRateFormatted,
  variableRate24hDelta,
  variableRateFormatted,
  aMMMaturity,
  backgroundColorToken,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeRegular'
    : 'secondaryBodyMediumRegular';

  return (
    <PoolEntryBox backgroundColorToken={backgroundColorToken}>
      <LeftBox>
        <MarketTokenInformation
          colorToken="lavenderWeb"
          iconSize={24}
          isAaveV3={isAaveV3}
          isBorrowing={isBorrowing}
          market={market}
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
        <ButtonStyled typographyToken="primaryBodySmallBold" variant="primary">
          Trade
        </ButtonStyled>
        <ButtonStyled typographyToken="primaryBodySmallBold" variant="secondary">
          Make
        </ButtonStyled>
      </RightBox>
    </PoolEntryBox>
  );
};
