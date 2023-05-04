import { LabelTokenTypography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../app/features/forms/common/utils';
import {
  selectPreviousPositionCompactNotional,
  selectPreviousPositionDepositedMargin,
  selectPreviousPositionNetBalance,
  selectPreviousPositionRealizedPNL,
  selectPreviousPositionSwapMode,
} from '../../../../../app/features/forms/rollover-swap-form';
import { useAppSelector } from '../../../../../app/hooks';
import { MODE_COLOR_TOKEN_MAP } from '../../helpers';
import {
  CashFlowBox,
  DepositedMarginBox,
  NotionalBox,
  PositionDetailsBox,
  PositionDetailsLeftBox,
  PositionDetailsRightBox,
  RealisedPNLBox,
} from './PositionDetails.styled';

type PreviousPositionDetailsUIProps = {
  underlyingTokenName: string;
  actionLabelTypographyToken: TypographyToken;
  actionTypographyToken: TypographyToken;
  labelTypographyToken: TypographyToken;
  typographyToken: TypographyToken;
};

export const PreviousPositionDetailsUI: React.FunctionComponent<PreviousPositionDetailsUIProps> = ({
  underlyingTokenName,
  actionLabelTypographyToken,
  actionTypographyToken,
  labelTypographyToken,
  typographyToken,
}) => {
  const realizedPNL = useAppSelector(selectPreviousPositionRealizedPNL);
  const compactNotional = useAppSelector(selectPreviousPositionCompactNotional);
  const mode = useAppSelector(selectPreviousPositionSwapMode);
  const compactDepositedMargin = useAppSelector(selectPreviousPositionDepositedMargin);
  const compactNetBalance = useAppSelector(selectPreviousPositionNetBalance);

  return (
    <PositionDetailsBox>
      <PositionDetailsLeftBox>
        <LabelTokenTypography
          colorToken={MODE_COLOR_TOKEN_MAP[mode]}
          label="Previous Position"
          labelColorToken="lavenderWeb"
          labelTypographyToken={actionLabelTypographyToken}
          token=""
          typographyToken={actionTypographyToken}
          value={mode === 'fixed' ? 'Fixed Taker' : 'Variable Taker'}
        />
      </PositionDetailsLeftBox>
      <PositionDetailsRightBox>
        <NotionalBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Notional"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={
              compactNotional
                ? `${compactNotional.compactNotionalSuffix} ${underlyingTokenName.toUpperCase()}`
                : ` ${underlyingTokenName.toUpperCase()}`
            }
            typographyToken={typographyToken}
            value={compactNotional ? compactNotional.compactNotionalNumber : '--'}
          />
        </NotionalBox>
        <DepositedMarginBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Deposited margin"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={
              compactDepositedMargin
                ? `${
                    compactDepositedMargin.compactDepositedMarginSuffix
                  } ${underlyingTokenName.toUpperCase()}`
                : ` ${underlyingTokenName.toUpperCase()}`
            }
            typographyToken={typographyToken}
            value={
              compactDepositedMargin ? compactDepositedMargin.compactDepositedMarginNumber : '--'
            }
          />
        </DepositedMarginBox>
        <RealisedPNLBox>
          {/*todo: FB make it same as in swap form*/}
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Realized PnL"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={` ${underlyingTokenName.toUpperCase()}`}
            typographyToken={typographyToken}
            value={realizedPNL !== null ? formFormatNumber(realizedPNL) : '--'}
          />
        </RealisedPNLBox>
        <CashFlowBox>
          <LabelTokenTypography
            colorToken="lavenderWeb"
            label="Net Balance"
            labelColorToken="lavenderWeb3"
            labelTypographyToken={labelTypographyToken}
            token={
              compactNetBalance
                ? `${
                    compactNetBalance.compactNetBalanceSuffix
                  } ${underlyingTokenName.toUpperCase()}`
                : ` ${underlyingTokenName.toUpperCase()}`
            }
            typographyToken={typographyToken}
            value={compactNetBalance ? compactNetBalance.compactNetBalanceNumber : '--'}
          />
        </CashFlowBox>
      </PositionDetailsRightBox>
    </PositionDetailsBox>
  );
};
