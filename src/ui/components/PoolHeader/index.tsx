import { LabelTokenTypography, Popover, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { useResponsiveQuery } from '../../../hooks/useResponsiveQuery';
import { MarketTokenInformation, MarketTokenInformationProps } from '../MarketTokenInformation';
import {
  FixedBox,
  MarketTokenInformationBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  VariableBox,
} from './PoolHeader.styled';
import { PoolList, PoolListProps } from './PoolList';
type PoolHeaderProps = {
  isAaveV3: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  fixedRateFormatted: string;
  variableRate24hDelta: number | undefined;
  variableRateFormatted: string;
  aMMMaturity: string;
  isV2: boolean;
  onPoolItemClick: PoolListProps['onPoolItemClick'];
  pools: PoolListProps['pools'];
};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = ({
  isAaveV3,
  isV2,
  isBorrowing,
  market,
  token,
  fixedRateFormatted,
  variableRate24hDelta,
  variableRateFormatted,
  aMMMaturity,
  onPoolItemClick,
  pools,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const typographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeBold'
    : 'secondaryBodyMediumBold';
  const [isToggleCaretOpen, setIsToggleCaretOpen] = useState(false);
  const handleOnToggleCaretClick = () => setIsToggleCaretOpen(!isToggleCaretOpen);
  const handleOnClickOutside = () => setIsToggleCaretOpen(false);

  return (
    <PoolHeaderBox>
      <Popover
        content={<PoolList pools={pools} onPoolItemClick={onPoolItemClick} />}
        data-testid="PoolHeaderPopover"
        isOpen={isToggleCaretOpen}
        onClickOutside={handleOnClickOutside}
      >
        <MarketTokenInformationBox>
          <MarketTokenInformation
            colorToken="lavenderWeb"
            iconSize={30}
            isAaveV3={isAaveV3}
            isBorrowing={isBorrowing}
            isToggleCaretOpen={isToggleCaretOpen}
            isV2={isV2}
            market={market}
            pillVariant="regular"
            showToggleCaret={true}
            token={token}
            typographyToken="primaryHeader2Black"
            onToggleCaretClick={handleOnToggleCaretClick}
          />
        </MarketTokenInformationBox>
      </Popover>
      <PoolHeaderDetailsBox>
        <FixedBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Fixed"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedRateFormatted}
          />
        </FixedBox>
        <VariableBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            differenceValue={variableRate24hDelta}
            label="Variable"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token="%"
            tooltip="Variable rate and the absolute change in the past 24 hours."
            typographyToken={typographyToken}
            value={variableRateFormatted}
          />
        </VariableBox>
        <MaturityBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Maturity"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token=""
            typographyToken={typographyToken}
            value={aMMMaturity}
          />
        </MaturityBox>
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
