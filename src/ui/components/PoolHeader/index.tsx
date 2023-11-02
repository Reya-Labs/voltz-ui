import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { LabelTokenTypography, Popover, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import React, { useState } from 'react';

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
  poolMaturity: string;
  onPoolItemClick: PoolListProps['onPoolItemClick'];
  pools: PoolListProps['pools'];
  poolCap: number;
  chainId: SupportedChainId;
};

export const PoolHeader: React.FunctionComponent<PoolHeaderProps> = ({
  isAaveV3,
  isBorrowing,
  chainId,
  market,
  token,
  fixedRateFormatted,
  variableRate24hDelta,
  variableRateFormatted,
  poolMaturity,
  onPoolItemClick,
  isV2,
  pools,
  poolCap,
}) => {
  const labelTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const typographyToken: TypographyToken = 'secondaryBodyMediumBold';
  const v2TypographyToken: TypographyToken = 'secondaryBodySmallBold';
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
            colorToken="white100"
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
            colorToken="white"
            label="Fixed"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            typographyToken={typographyToken}
            value={fixedRateFormatted}
          />
        </FixedBox>
        <VariableBox>
          <LabelTokenTypography
            colorToken="white"
            differenceToken="%"
            differenceValue={variableRate24hDelta}
            label="Variable"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token="%"
            tooltip="Variable rate and the absolute change in the past 24 hours."
            typographyToken={typographyToken}
            value={variableRateFormatted}
          />
        </VariableBox>
        <MaturityBox>
          <LabelTokenTypography
            colorToken="white"
            label="Maturity"
            labelColorToken="white400"
            labelTypographyToken={labelTypographyToken}
            token=""
            typographyToken={typographyToken}
            value={poolMaturity}
          />
        </MaturityBox>
        {isV2 ? (
          <V2InfoBox>
            <TypographyWithTooltip
              colorToken="rainbow"
              tooltip={<V2InfoTooltip chainId={chainId} poolCap={poolCap} />}
              typographyToken={v2TypographyToken}
            >
              Voltz Protocol v2 Alpha Launch
            </TypographyWithTooltip>
          </V2InfoBox>
        ) : null}
      </PoolHeaderDetailsBox>
    </PoolHeaderBox>
  );
};
