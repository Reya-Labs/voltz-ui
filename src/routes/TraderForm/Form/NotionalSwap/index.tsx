import { TokenTypography, Typography, TypographyWithTooltip } from 'brokoli-ui';
import React, { useCallback, useEffect, useState } from 'react';
import MovingComponent from 'react-moving-text';

import {
  selectFixedRateInfo,
  selectMode,
  selectVariableRateInfo,
  setModeAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { ReactComponent as ArrowsSvg } from './arrows.svg';
import {
  BottomTextContent,
  NotionalSwapBox,
  NotionalSwapFixedBox,
  NotionalSwapSwapper,
  NotionalSwapVariableBox,
  NotionalSwapWrapperBox,
  TopTextContent,
} from './NotionalSwap.styled';

export const NotionalSwap: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();

  const fixedRateInfo = useAppSelector(selectFixedRateInfo);
  const variableRateInfo = useAppSelector(selectVariableRateInfo);
  const mode = useAppSelector(selectMode);

  const fixedRate = fixedRateInfo.status === 'success' ? formatNumber(fixedRateInfo.value) : '--';
  const variableRate =
    variableRateInfo.status === 'success' ? formatNumber(variableRateInfo.value) : '--';
  const isFixedMode = mode === 'fixed';

  const onSwap = useCallback(
    (value?: 'fixed' | 'variable') => {
      if (!value) {
        return;
      }
      dispatch(
        setModeAction({
          value,
        }),
      );
    },
    [dispatch],
  );

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), 500);
    }
  }, [animate]);

  return (
    <NotionalSwapWrapperBox>
      <TypographyWithTooltip
        colorToken="lavenderWeb2"
        tooltip="When you swap rates, you will be receiving at one rate and paying at another. Choose the rate you want to receive at."
        typographyToken="primaryBodySmallRegular"
      >
        Select Notional Swap Direction
      </TypographyWithTooltip>
      <NotionalSwapBox>
        <NotionalSwapFixedBox>
          <TopTextContent>
            <MovingComponent
              key={mode}
              duration="1000ms"
              fillMode="forwards"
              iteration={1}
              timing="linear"
              type="shakeMix"
            >
              <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
                {isFixedMode ? 'Receive Fixed' : 'Receive Variable'}
              </Typography>
            </MovingComponent>
            <TokenTypography
              colorToken={isFixedMode ? 'skyBlueCrayola' : 'ultramarineBlue'}
              token="%"
              typographyToken="primaryBodyMediumBold"
              value={isFixedMode ? fixedRate : variableRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumRegular">
              {isFixedMode ? `Pay Variable ${variableRate}%` : `Pay Fixed ${fixedRate}%`}
            </Typography>
          </BottomTextContent>
        </NotionalSwapFixedBox>
        <NotionalSwapSwapper
          animate={animate}
          onClick={() => {
            onSwap(mode === 'fixed' ? 'variable' : 'fixed');
            setAnimate(true);
          }}
        >
          <ArrowsSvg />
        </NotionalSwapSwapper>
        <NotionalSwapVariableBox>
          <TopTextContent>
            <Typography colorToken="lavenderWeb2" typographyToken="primaryBodyMediumBold">
              {isFixedMode ? 'Receive Variable' : 'Receive Fixed'}
            </Typography>
            <TokenTypography
              colorToken={isFixedMode ? 'ultramarineBlue' : 'skyBlueCrayola'}
              token="%"
              typographyToken="primaryBodyMediumBold"
              value={isFixedMode ? variableRate : fixedRate}
            />
          </TopTextContent>
          <BottomTextContent>
            <Typography colorToken="lavenderWeb4" typographyToken="primaryBodyMediumRegular">
              {isFixedMode ? `Pay Fixed ${fixedRate}%` : `Pay Variable ${variableRate}%`}
            </Typography>
          </BottomTextContent>
        </NotionalSwapVariableBox>
      </NotionalSwapBox>
    </NotionalSwapWrapperBox>
  );
};
