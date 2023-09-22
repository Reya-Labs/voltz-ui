import { FromToTokenTypography, HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../../../app';
import {
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowSimulationValueFormatted,
  selectMarginAccountWithdrawFlowUserInputFormatted,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import { ReactComponent as GasIcon } from './gas-icon.svg';
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
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account Margin
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            prefixToken="$"
            token={balanceCompactFormat.compactSuffix}
            typographyToken="secondaryBodySmallRegular"
            value={balanceCompactFormat.compactNumber}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Available To Withdraw
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={`($${maxAmountUSDFormatted})`}
            typographyToken="secondaryBodySmallRegular"
            value={maxAmountFormatted}
          />
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account Margin Ratio
          </Typography>
          <FromToTokenTypography
            fromColorToken={
              marginRatioHealth !== '--'
                ? MARGIN_RATIO_COLOR_MAP[marginRatioHealth as MarginAccountUI['marginRatioHealth']]
                : 'lavenderWeb'
            }
            fromToken="%"
            fromValue={marginRatioPercentage}
            toColorToken={
              simulationMarginRatioHealth !== '--'
                ? MARGIN_RATIO_COLOR_MAP[
                    simulationMarginRatioHealth as MarginAccountUI['marginRatioHealth']
                  ]
                : 'lavenderWeb'
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
          <GasIcon />
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          prefixToken="$"
          token={` ${gasFeeUSDFormatted.compactSuffix}`}
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeUSDFormatted.compactNumber}
        />
      </TransactionDetailBox>
    </WithdrawMarginDetailsWrapperBox>
  );
};
