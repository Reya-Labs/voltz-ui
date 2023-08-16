import { FromToTokenTypography, HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowSimulationValueFormatted,
  selectMarginAccountWithdrawFlowUserInputFormatted,
} from '../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../app/features/portfolio/types';
import { useAppSelector } from '../../../../../../../../app/hooks';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../MarginAccounts/PortfolioOverview/Overview/MarginAccountList/MarginAccountEntry/MarginRatioDonut/constants';
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
          {marginRatioHealth !== '--' &&
          marginRatioPercentage !== '--' &&
          simulationMarginRatioHealth !== '--' &&
          simulationMarginRatioPercentage !== '--' ? (
            <FromToTokenTypography
              fromColorToken={
                MARGIN_RATIO_COLOR_MAP[marginRatioHealth as MarginAccountUI['marginRatioHealth']]
              }
              fromValue={marginRatioPercentage}
              toColorToken={
                MARGIN_RATIO_COLOR_MAP[
                  simulationMarginRatioHealth as MarginAccountUI['marginRatioHealth']
                ]
              }
              toValue={simulationMarginRatioPercentage}
              typographyToken="secondaryBodySmallRegular"
            />
          ) : null}
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
