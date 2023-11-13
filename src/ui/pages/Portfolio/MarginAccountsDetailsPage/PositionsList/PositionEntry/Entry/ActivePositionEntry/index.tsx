import { Dialog, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { PositionUI } from '../../../../../../../../app/features/portfolio/types';
import { TestNetIndicator } from '../../../../../../../components/TestNetIndicator';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  LeftBox,
  MarginBox,
  MaturityBox,
  NotionalBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  RightBox,
  StatusBox,
  TestPillContainer,
  UnrealizedPNLBox,
} from '../../PositionEntry.styled';
import { PositionMargin } from '../../PositionMargin';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionNotional } from '../../PositionNotional';
import { PositionRealizedPNLDetails } from '../../PositionRealizedPNLDetails';
import { PositionStatus } from '../../PositionStatus';
import { PositionUnrealizedPNLDetails } from '../../PositionUnrealizedPNLDetails';
import { PositionTransactionHistoryDialogContent } from '../PositionTransactionHistoryDialogContent';
import { EntryProps } from '../types';

export const ActivePositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
  (
    {
      chainId,
      isBorrowing,
      market,
      token,
      maturityFormatted,
      backgroundColorToken,
      routePoolId,
      routeAmmId,
      status,
      marginUSDCompactFormat,
      notionalUSDCompactFormat,
      realizedPNLTotalUSDCompactFormat,
      realizedPNLFeesUSD,
      realizedPNLTotalUSD,
      realizedPNLCashflowUSD,
      unrealizedPNLUSDCompactFormat,
      type,
      maturityEndTimestampInMS,
      maturityStartTimestampInMS,
      routePositionId,
      id,
    },
    ref,
  ) => {
    const [transactionHistoryDialogOpen, setTransactionHistoryDialogOpen] = useState(false);

    const numbersTypographyToken: TypographyToken = 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = 'primaryBodySmallRegular';

    const handleOnEntryClick = () => setTransactionHistoryDialogOpen(true);
    const handleOnClose = () => setTransactionHistoryDialogOpen(false);

    const testNetIndicator = <TestNetIndicator chainId={chainId} />;
    return (
      <React.Fragment>
        <Dialog open={transactionHistoryDialogOpen}>
          <PositionTransactionHistoryDialogContent
            chainId={chainId}
            id={id}
            isBorrowing={isBorrowing}
            market={market as PositionUI['market']}
            routeAmmId={routeAmmId}
            routePoolId={routePoolId}
            routePositionId={routePositionId}
            status={status}
            token={token}
            type={type}
            onClose={handleOnClose}
          />
        </Dialog>
        <PositionEntryBoxWrapper ref={ref} onClick={handleOnEntryClick}>
          {testNetIndicator ? <TestPillContainer>{testNetIndicator}</TestPillContainer> : null}
          <HealthIndicator health={status.health} />
          <PositionEntryBox backgroundColorToken={backgroundColorToken}>
            <LeftBox>
              <MarketTokenInformation
                isBorrowing={isBorrowing}
                market={market}
                token={token}
                type={type}
                typographyToken={textsTypographyToken}
              />
            </LeftBox>
            <RightBox>
              <NotionalBox>
                <PositionNotional
                  notionalUSDCompactFormat={notionalUSDCompactFormat}
                  status={status}
                  typographyToken={numbersTypographyToken}
                />
              </NotionalBox>
              <MarginBox>
                <PositionMargin
                  marginUSDCompactFormat={marginUSDCompactFormat}
                  typographyToken={numbersTypographyToken}
                />
              </MarginBox>
              <MaturityBox>
                <PositionMaturity
                  maturityEndTimestampInMS={maturityEndTimestampInMS}
                  maturityFormatted={maturityFormatted}
                  maturityStartTimestampInMS={maturityStartTimestampInMS}
                  typographyToken={textsTypographyToken}
                />
              </MaturityBox>
              <StatusBox variant="large">
                <PositionStatus
                  numbersTypographyToken={numbersTypographyToken}
                  status={status}
                  textsTypographyToken={textsTypographyToken}
                  type={type}
                />
              </StatusBox>
              <UnrealizedPNLBox>
                <PositionUnrealizedPNLDetails
                  numbersTypographyToken={numbersTypographyToken}
                  type={type}
                  unrealizedPNLUSDCompactFormat={unrealizedPNLUSDCompactFormat}
                />
              </UnrealizedPNLBox>
              <RealizedPNLBox>
                <PositionRealizedPNLDetails
                  realizedPNLCashflowUSD={realizedPNLCashflowUSD}
                  realizedPNLFeesUSD={realizedPNLFeesUSD}
                  realizedPNLTotalUSD={realizedPNLTotalUSD}
                  realizedPNLTotalUSDCompactFormat={realizedPNLTotalUSDCompactFormat}
                  type={type}
                  typographyToken={numbersTypographyToken}
                />
              </RealizedPNLBox>
            </RightBox>
          </PositionEntryBox>
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
