import { FromToTokenTypography, HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  selectMarginAccountDepositFlowSimulationValueFormatted,
  selectMarginAccountDepositFlowUserInputFormatted,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import {
  DepositMarginDetailsBox,
  DepositMarginDetailsWrapperBox,
  IconTextWrapper,
  TransactionDetailBox,
} from './DepositMarginDetails.styled';
import { ReactComponent as GasIcon } from './gas-icon.svg';

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
            Available To Deposit
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
      </DepositMarginDetailsBox>
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
    </DepositMarginDetailsWrapperBox>
  );
};
