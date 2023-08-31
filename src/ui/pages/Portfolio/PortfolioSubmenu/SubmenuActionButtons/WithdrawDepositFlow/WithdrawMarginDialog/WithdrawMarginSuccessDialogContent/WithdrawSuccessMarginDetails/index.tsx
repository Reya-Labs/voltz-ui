import { Confetti, FromToTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectMarginAccountWithdrawFlowEtherscanLink,
  selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted,
  selectMarginAccountWithdrawFlowSimulationValueFormatted,
  selectMarginAccountWithdrawFlowUserInputFormatted,
} from '../../../../../../../../../app/features/portfolio';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import { ExplorerLink } from '../../../../../../../../components/ExplorerLink';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../MarginAccountsOverviewPage/PortfolioOverview/Overview/MarginAccountList/MarginAccountEntry/MarginRatioDonut/constants';
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
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account
          </Typography>
          <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
            {name}
          </Typography>
        </TransactionDetailBox>
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Withdrew
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={`${amountFormatted.compactSuffix} ${(token || '').toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value={amountFormatted.compactNumber}
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
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
    </WithdrawMarginDetailsWrapperBox>
  );
};
