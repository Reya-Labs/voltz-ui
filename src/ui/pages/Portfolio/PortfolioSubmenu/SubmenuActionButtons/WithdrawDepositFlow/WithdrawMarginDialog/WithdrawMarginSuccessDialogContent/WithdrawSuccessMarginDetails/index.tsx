import { Confetti, FromToTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../../../app';
import {
  selectMarginAccountWithdrawFlowEtherscanLink,
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowSimulationValueFormatted,
  selectMarginAccountWithdrawFlowUserInputFormatted,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { ExplorerLink } from '../../../../../../../../components/ExplorerLink';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import {
  TransactionDetailBox,
  WithdrawMarginDetailsBox,
  WithdrawMarginDetailsWrapperBox,
} from './WithdrawSuccessMarginDetails.styled';

type TransactionDetailsProps = {};

export const WithdrawSuccessMarginDetails: React.FunctionComponent<
  TransactionDetailsProps
> = () => {
  const etherscanLink = useAppSelector(selectMarginAccountWithdrawFlowEtherscanLink);
  const {
    marginRatioHealth: simulationMarginRatioHealth,
    marginRatioPercentage: simulationMarginRatioPercentage,
  } = useAppSelector(selectMarginAccountWithdrawFlowSimulationValueFormatted);
  const { name, marginRatioHealth, marginRatioPercentage } = useAppSelector(
    selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  );
  const { amountFormatted, token } = useAppSelector(
    selectMarginAccountWithdrawFlowUserInputFormatted,
  );
  return (
    <WithdrawMarginDetailsWrapperBox>
      <WithdrawMarginDetailsBox>
        <TransactionDetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Account
          </Typography>
          <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
            {name}
          </Typography>
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Withdrew
          </Typography>
          <TokenTypography
            colorToken="white"
            token={`${amountFormatted.compactSuffix} ${(token || '').toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value={amountFormatted.compactNumber}
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
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
    </WithdrawMarginDetailsWrapperBox>
  );
};
