import { LabelTokenTypography, Pill, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import {
  FilterBox,
  FiltersBox,
  InformationBox,
  PoolsInformationBox,
  VerticalLine,
} from './PoolsInformation.styled';

export const PoolsInformation: React.FunctionComponent = () => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeBold'
    : 'secondaryBodyMediumBold';

  const numberOfPools = 12;
  const tradingVolume7dValue = '$245';
  const tradingVolume7dToken = 'M';
  const totalLiquidityValue = '$245.004';
  const totalLiquidityToken = 'M';

  const filters = [
    {
      id: 'borrow',
      label: 'Borrow',
      isActive: true,
    },
    {
      id: 'eth',
      label: 'ETH',
      isActive: true,
    },
    {
      id: 'staking',
      label: 'Staking',
      isActive: true,
    },
    {
      id: 'lending',
      label: 'Lending',
      isActive: true,
    },
  ];

  return (
    <PoolsInformationBox>
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Markets"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token=""
          typographyToken={typographyToken}
          value={numberOfPools}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Trading Volume 7d"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={tradingVolume7dToken}
          tooltip="TODO: Tooltip"
          typographyToken={typographyToken}
          value={tradingVolume7dValue}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Total Liquidity"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={totalLiquidityToken}
          typographyToken={typographyToken}
          value={totalLiquidityValue}
        />
      </InformationBox>
      <VerticalLine />
      <FilterBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="TODO: Missing tooltip"
          typographyToken={labelTypographyToken}
        >
          Filter by
        </TypographyWithTooltip>
        <FiltersBox>
          {filters.map((filter) => (
            <Pill
              key={filter.id}
              colorToken={filter.isActive ? 'lavenderWeb' : 'liberty'}
              typographyToken="primaryBodySmallRegular"
              variant="compact"
            >
              {filter.label}
            </Pill>
          ))}
        </FiltersBox>
      </FilterBox>
    </PoolsInformationBox>
  );
};
