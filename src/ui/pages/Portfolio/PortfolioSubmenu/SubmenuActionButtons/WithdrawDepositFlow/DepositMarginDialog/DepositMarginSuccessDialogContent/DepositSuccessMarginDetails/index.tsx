import { Confetti, FromToTokenTypography, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../../../../app';
import {
  selectMarginAccountDepositFlowEtherscanLink,
  selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  selectMarginAccountDepositFlowSimulationValueFormatted,
  selectMarginAccountDepositFlowUserInputFormatted,
} from '../../../../../../../../../app/features/deposit-flow';
import { MarginAccountUI } from '../../../../../../../../../app/features/portfolio/types';
import { ExplorerLink } from '../../../../../../../../components/ExplorerLink';
import { MARGIN_RATIO_COLOR_MAP } from '../../../../../../../../components/MarginRatioDonut/constants';
import {
  DepositMarginDetailsBox,
  DepositMarginDetailsWrapperBox,
  TransactionDetailBox,
} from './DepositSuccessMarginDetails.styled';

type TransactionDetailsProps = {};

export const DepositSuccessMarginDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const etherscanLink = useAppSelector(selectMarginAccountDepositFlowEtherscanLink);
  const {
    marginRatioHealth: simulationMarginRatioHealth,
    marginRatioPercentage: simulationMarginRatioPercentage,
  } = useAppSelector(selectMarginAccountDepositFlowSimulationValueFormatted);
  const { name, marginRatioHealth, marginRatioPercentage } = useAppSelector(
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted,
  );
  const { amountFormatted, token } = useAppSelector(
    selectMarginAccountDepositFlowUserInputFormatted,
  );
  return (
    <DepositMarginDetailsWrapperBox>
      <DepositMarginDetailsBox>
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
      </DepositMarginDetailsBox>
      <Confetti>
        <ExplorerLink link={etherscanLink} />
      </Confetti>
    </DepositMarginDetailsWrapperBox>
  );
};
