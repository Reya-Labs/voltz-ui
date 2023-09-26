import { LabelTokenTypography, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app';
import {
  selectPoolFilterOptions,
  selectV1V2PoolsSize,
  togglePoolFilterAction,
} from '../../../../app/features/aMMs';
import { usePoolsInformation } from '../../../hooks/usePoolsInformation';
import { useResponsiveQuery } from '../../../hooks/useResponsiveQuery';
import {
  FilterBox,
  FiltersBox,
  InformationBox,
  PoolFilterPill,
  PoolsInformationBox,
  VerticalLine,
} from './PoolsInformation.styled';

export const PoolsInformation: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const poolsSize = useAppSelector(selectV1V2PoolsSize);
  const { volume30DaysFormatted, totalLiquidityFormatted } = usePoolsInformation();
  const filterOptions = useAppSelector(selectPoolFilterOptions);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeBold'
    : 'secondaryBodyMediumBold';

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
          value={poolsSize}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Trading Volume 30d"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={volume30DaysFormatted.compactSuffix}
          tooltip="Cumulative notional traded in all pools over the past 30 days"
          typographyToken={typographyToken}
          value={volume30DaysFormatted.compactNumber}
        />
      </InformationBox>
      <VerticalLine />
      <InformationBox>
        <LabelTokenTypography
          colorToken="lavenderWeb"
          label="Total Liquidity"
          labelColorToken="lavenderWeb3"
          labelTypographyToken={labelTypographyToken}
          token={totalLiquidityFormatted.compactSuffix}
          typographyToken={typographyToken}
          value={totalLiquidityFormatted.compactNumber}
        />
      </InformationBox>
      <VerticalLine />
      <FilterBox>
        <TypographyWithTooltip
          colorToken="lavenderWeb3"
          tooltip="Filter pools by selecting a pool criteria"
          typographyToken={labelTypographyToken}
        >
          Filter by
        </TypographyWithTooltip>
        <FiltersBox>
          {filterOptions.map((filter) => (
            <PoolFilterPill
              key={filter.id}
              colorToken={filter.isActive ? 'lavenderWeb' : 'liberty'}
              typographyToken="primaryBodySmallRegular"
              variant="compact"
              onClick={() => {
                dispatch(
                  togglePoolFilterAction({
                    filterId: filter.id,
                  }),
                );
              }}
            >
              {filter.label}
            </PoolFilterPill>
          ))}
        </FiltersBox>
      </FilterBox>
    </PoolsInformationBox>
  );
};
