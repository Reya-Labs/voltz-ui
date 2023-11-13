import { FromToTokenTypography, HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../../../app';
import {
  selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  selectMarginAccountDepositFlowSimulationValueFormatted,
  selectMarginAccountDepositFlowUserInputFormatted,
} from '../../../../../../../../../app/features/deposit-flow';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { Icon } from '../../../../../../../../components/Icon/Icon';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import {
  DepositMarginDetailsBox,
  DepositMarginDetailsWrapperBox,
  IconTextWrapper,
  TransactionDetailBox,
} from './DepositMarginDetails.styled';

type TransactionDetailsProps = {};

export const DepositMarginDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const {
    gasFeeUSDFormatted,
    marginRatioHealth: simulationMarginRatioHealth,
    marginRatioPercentage: simulationMarginRatioPercentage,
  } = useAppSelector(selectMarginAccountDepositFlowSimulationValueFormatted);
  const { marginRatioHealth, marginRatioPercentage, balanceCompactFormat } = useAppSelector(
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  );
  const { maxAmountFormatted, maxAmountUSDFormatted } = useAppSelector(
    selectMarginAccountDepositFlowUserInputFormatted,
  );
  return (
    <DepositMarginDetailsWrapperBox>
      <DepositMarginDetailsBox>
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
            Available To Deposit
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
      </DepositMarginDetailsBox>
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
    </DepositMarginDetailsWrapperBox>
  );
};
