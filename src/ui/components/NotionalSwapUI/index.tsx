import { TokenTypography, Typography, TypographyToken, TypographyWithTooltip } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { formatNumber } from '../../../utilities/number';
import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { ReactComponent as ArrowsSvg } from './arrows.svg';
import {
  BottomTextContent,
  NotionalSwapBox,
  NotionalSwapFixedBox,
  NotionalSwapSwapper,
  NotionalSwapVariableBox,
  NotionalSwapWrapperBox,
  TopTextContent,
} from './NotionalSwapUI.styled';

type NotionalSwapUIProps = {
  loading: boolean;
  fixedRateInfo: number | undefined;
  variableRateInfo: number | undefined;
  mode: 'fixed' | 'variable';
  onModeChange: (mode: 'fixed' | 'variable') => void;
};
export const NotionalSwapUI: React.FunctionComponent<NotionalSwapUIProps> = ({
  fixedRateInfo,
  variableRateInfo,
  loading,
  onModeChange,
  mode,
}) => {
  const [localMode, setLocalMode] = useState<'fixed' | 'variable'>('fixed');
  const fixedRate = fixedRateInfo ? formatNumber(fixedRateInfo) : '--';
  const variableRate = variableRateInfo ? formatNumber(variableRateInfo) : '--';
  const isFixedMode = localMode === 'fixed';
  const { isLargeDesktopDevice } = useResponsiveQuery();

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

  const receiveTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyExtraLargeBold'
    : 'primaryBodyMediumBold';

  const payTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodyXSmallRegular';

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const percentageTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'secondaryBodyLargeRegular'
    : 'secondaryBodyMediumRegular';

  return (
    <NotionalSwapWrapperBox>
      <TypographyWithTooltip
        colorToken="white300"
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
              colorToken={isFixedMode ? 'primary' : 'secondary'}
              token="%"
              typographyToken={percentageTypographyToken}
              value={isFixedMode ? fixedRate : variableRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="white300" typographyToken={payTypographyToken}>
              {isFixedMode ? `Pay Variable ${variableRate}%` : `Pay Fixed ${fixedRate}%`}
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
              colorToken={isFixedMode ? 'secondary' : 'primary'}
              token="%"
              typographyToken={percentageTypographyToken}
              value={isFixedMode ? variableRate : fixedRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="white500" typographyToken={payTypographyToken}>
              {isFixedMode ? `Pay Fixed ${fixedRate}%` : `Pay Variable ${variableRate}%`}
            </Typography>
          </BottomTextContent>
        </NotionalSwapVariableBox>
      </NotionalSwapBox>
    </NotionalSwapWrapperBox>
  );
};
