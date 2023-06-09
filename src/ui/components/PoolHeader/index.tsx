import { LabelTokenTypography, Popover, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React, { useState } from 'react';

import { useResponsiveQuery } from '../../../hooks/useResponsiveQuery';
import { MarketTokenInformation, MarketTokenInformationProps } from '../MarketTokenInformation';
import {
  FixedBox,
  MarketTokenInformationBox,
  MaturityBox,
  PoolHeaderBox,
  PoolHeaderDetailsBox,
  V2InfoBox,
  VariableBox,
} from './PoolHeader.styled';
import { PoolList, PoolListProps } from './PoolList';
import { V2InfoTooltip } from './V2InfoTooltip';
type PoolHeaderProps = {
  isAaveV3: boolean;
  isV2: boolean;
  isBorrowing: boolean;
  market: MarketTokenInformationProps['market'];
  token: MarketTokenInformationProps['token'];
  fixedRateFormatted: string;
  variableRate24hDelta: number | undefined;
  variableRateFormatted: string;
  aMMMaturity: string;
  onPoolItemClick: PoolListProps['onPoolItemClick'];
  pools: PoolListProps['pools'];
  poolCap: number;
};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = ({
  isAaveV3,
  isBorrowing,
  market,
  token,
  fixedRateFormatted,
  variableRate24hDelta,
  variableRateFormatted,
  aMMMaturity,
  onPoolItemClick,
  isV2,
  pools,
  poolCap,
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
            market={market}
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
            differenceToken="%"
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
        {isV2 ? (
          <V2InfoBox>
            <TypographyWithTooltip
              colorToken="rainbow"
              tooltip={<V2InfoTooltip poolCap={poolCap} />}
              typographyToken={typographyToken}
            >
              Voltz v2 Alpha Launch
            </TypographyWithTooltip>
          </V2InfoBox>
        ) : null}
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
