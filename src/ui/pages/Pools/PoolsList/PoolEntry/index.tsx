import { ColorTokens, TokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { routes } from '../../../../../routes/paths';
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
};

export const PoolEntry = React.forwardRef<HTMLDivElement, PoolEntryProps>(
  (
    {
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
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const navigate = useNavigate();

    const typographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyLargeRegular'
      : 'secondaryBodyMediumRegular';

    const handleOnLPClick = () => {
      const path = generatePath(routes.LP_FORM, {
        form: 'liquidity',
        ammId: routeAmmId,
        poolId: routePoolId,
      });
      navigate(`/${path}`);
    };

    const handleOnTradeClick = () => {
      const path = generatePath(routes.TRADER_FORM, {
        form: 'swap',
        ammId: routeAmmId,
        poolId: routePoolId,
      });
      navigate(`/${path}`);
    };

    return (
      <PoolEntryBox
        ref={ref}
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
    );
  },
);