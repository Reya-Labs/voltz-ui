import { FromToTokenTypography, HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../../../app';
import {
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowSimulationValueFormatted,
  selectMarginAccountWithdrawFlowUserInputFormatted,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { Icon } from '../../../../../../../../components/Icon/Icon';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import {
  IconTextWrapper,
  TransactionDetailBox,
  WithdrawMarginDetailsBox,
  WithdrawMarginDetailsWrapperBox,
} from './WithdrawMarginDetails.styled';

type TransactionDetailsProps = {};

export const WithdrawMarginDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const {
    gasFeeUSDFormatted,
    marginRatioHealth: simulationMarginRatioHealth,
    marginRatioPercentage: simulationMarginRatioPercentage,
  } = useAppSelector(selectMarginAccountWithdrawFlowSimulationValueFormatted);
  const { marginRatioHealth, marginRatioPercentage, balanceCompactFormat } = useAppSelector(
    selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  );
  const { maxAmountFormatted, maxAmountUSDFormatted } = useAppSelector(
    selectMarginAccountWithdrawFlowUserInputFormatted,
  );
  return (
    <WithdrawMarginDetailsWrapperBox>
      <WithdrawMarginDetailsBox>
        <TransactionDetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Account Margin
          </Typography>
          <TokenTypography
            colorToken="white"
            prefixToken="$"
            token={balanceCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={balanceCompactFormat.compactNumber}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Available To Withdraw
          </Typography>
          <TokenTypography
            colorToken="white"
            token={`($${maxAmountUSDFormatted})`}
            typographyToken="secondaryBodySmallRegular"
            value={maxAmountFormatted}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Account Margin Ratio
          </Typography>
          <FromToTokenTypography
            fromColorToken={
              marginRatioHealth !== '--'
                ? MARGIN_RATIO_COLOR_MAP[marginRatioHealth as MarginAccountUI['marginRatioHealth']]
                : 'white'
            }
            fromToken="%"
            fromValue={marginRatioPercentage}
            toColorToken={
              simulationMarginRatioHealth !== '--'
                ? MARGIN_RATIO_COLOR_MAP[
                    simulationMarginRatioHealth as MarginAccountUI['marginRatioHealth']
                  ]
                : 'white'
            }
            toToken="%"
            toValue={simulationMarginRatioPercentage}
            typographyToken="secondaryBodySmallRegular"
          />
        </TransactionDetailBox>
      </WithdrawMarginDetailsBox>
      <HorizontalLine />
      <TransactionDetailBox>
        <IconTextWrapper>
          <Icon name="gasIcon" />
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="white"
          prefixToken="$"
          token={` ${gasFeeUSDFormatted.compactSuffix}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeUSDFormatted.compactNumber}
        />
      </TransactionDetailBox>
    </WithdrawMarginDetailsWrapperBox>
  );
};
