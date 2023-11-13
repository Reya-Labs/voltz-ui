import { TokenTypography, Typography, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { formatNumber } from '../../../utilities/number';
import { ReactComponent as ArrowsSvg } from './arrows.svg';
import {
  BottomTextContent,
  NotionalSwapBox,
  NotionalSwapFixedBox,
  NotionalSwapSwapper,
  NotionalSwapVariableBox,
  NotionalSwapWrapperBox,
  TopTextContent,
} from './NotionalSwapHorizontalUI.styled';

type NotionalSwapHorizontalUIProps = {
  loading: boolean;
  receiveFixedRateInfo: number | undefined;
  variableRateInfo: number | undefined;
  payFixedRateInfo: number | undefined;
  mode: 'fixed' | 'variable';
  onModeChange: (mode: 'fixed' | 'variable') => void;
};
export const NotionalSwapHorizontalUI: React.FunctionComponent<NotionalSwapHorizontalUIProps> = ({
  receiveFixedRateInfo,
  variableRateInfo,
  payFixedRateInfo,
  loading,
  onModeChange,
  mode,
}) => {
  const [localMode, setLocalMode] = useState<'fixed' | 'variable'>('fixed');
  const receiveFixedRate = receiveFixedRateInfo ? formatNumber(receiveFixedRateInfo) : '--';
  const variableRate = variableRateInfo ? formatNumber(variableRateInfo) : '--';
  const payFixedRate = payFixedRateInfo ? formatNumber(payFixedRateInfo) : '--';
  const isFixedMode = localMode === 'fixed';

  const debouncedSetMode = useMemo(
    () =>
      debounce((value: 'fixed' | 'variable') => {
        setAnimate(true);
        onModeChange && onModeChange(value);
      }, 300),
    [onModeChange],
  );

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), 500);
    }
  }, [animate]);

  const handleOnModeChange = useCallback(() => {
    if (loading) {
      return;
    }
    const nextMode = localMode === 'fixed' ? 'variable' : 'fixed';
    setLocalMode(nextMode);
    debouncedSetMode(nextMode);
  }, [loading, localMode, debouncedSetMode]);

  useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetMode.cancel();
    };
  }, []);

  const receiveTypographyToken: TypographyToken = 'primaryBodyXSmallBold';
  const payTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const labelTypographyToken: TypographyToken = 'primaryBodySmallBold';
  const percentageTypographyToken: TypographyToken = 'primaryBodyXSmallBold';

  return (
    <NotionalSwapWrapperBox>
      <TypographyWithTooltip
        colorToken="white100"
        tooltip="When trading interest rate swaps, you receive one rate and pay out the other. Choose the rate you wish to receive vs. pay."
        typographyToken={labelTypographyToken}
      >
        Select Notional Swap Direction
      </TypographyWithTooltip>
      <NotionalSwapBox>
        <NotionalSwapFixedBox>
          <TopTextContent>
            <Typography colorToken="white100" typographyToken={receiveTypographyToken}>
              {isFixedMode ? 'Receive Fixed' : 'Receive Variable'}
            </Typography>
            <TokenTypography
              colorToken={isFixedMode ? 'primary' : 'error'}
              token="%"
              typographyToken={percentageTypographyToken}
              value={isFixedMode ? receiveFixedRate : variableRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="white300" typographyToken={payTypographyToken}>
              {isFixedMode ? `Pay Variable ${variableRate}%` : `Pay Fixed ${payFixedRate}%`}
            </Typography>
          </BottomTextContent>
        </NotionalSwapFixedBox>
        <NotionalSwapSwapper animate={animate} onClick={handleOnModeChange}>
          <ArrowsSvg />
        </NotionalSwapSwapper>
        <NotionalSwapVariableBox>
          <TopTextContent>
            <Typography colorToken="white300" typographyToken={receiveTypographyToken}>
              {isFixedMode ? 'Receive Variable' : 'Receive Fixed'}
            </Typography>
            <TokenTypography
              colorToken={isFixedMode ? 'error' : 'primary'}
              token="%"
              typographyToken={percentageTypographyToken}
              value={isFixedMode ? variableRate : receiveFixedRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="white500" typographyToken={payTypographyToken}>
              {isFixedMode ? `Pay Fixed ${payFixedRate}%` : `Pay Variable ${variableRate}%`}
            </Typography>
          </BottomTextContent>
        </NotionalSwapVariableBox>
      </NotionalSwapBox>
    </NotionalSwapWrapperBox>
  );
};
