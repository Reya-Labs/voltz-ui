import { Dialog, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { PositionUI } from '../../../../../../../../app/features/portfolio/types';
import { TestNetIndicator } from '../../../../../../../components/TestNetIndicator';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  LeftBox,
  MaturityBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RightBox,
  StatusBox,
  TestPillContainer,
} from '../../PositionEntry.styled';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionStatus } from '../../PositionStatus';
import { PositionTransactionHistoryDialogContent } from '../PositionTransactionHistoryDialogContent';
import { EntryProps } from '../types';

export const SettledPositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
  (
    {
      id,
      chainId,
      isBorrowing,
      market,
      token,
      maturityFormatted,
      backgroundColorToken,
      routePoolId,
      routeAmmId,
      status,
      type,
      maturityEndTimestampInMS,
      maturityStartTimestampInMS,
      routePositionId,
    },
    ref,
  ) => {
    const [transactionHistoryDialogOpen, setTransactionHistoryDialogOpen] = useState(false);
    const numbersTypographyToken: TypographyToken = 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = 'primaryBodySmallRegular';

    const testNetIndicator = <TestNetIndicator chainId={chainId} />;
    const handleOnEntryClick = () => setTransactionHistoryDialogOpen(true);
    const handleOnClose = () => setTransactionHistoryDialogOpen(false);
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
              <MaturityBox>
                <PositionMaturity
                  maturityEndTimestampInMS={maturityEndTimestampInMS}
                  maturityFormatted={maturityFormatted}
                  maturityStartTimestampInMS={maturityStartTimestampInMS}
                  typographyToken={textsTypographyToken}
                />
              </MaturityBox>
              <StatusBox variant="small">
                <PositionStatus
                  numbersTypographyToken={numbersTypographyToken}
                  status={status}
                  textsTypographyToken={textsTypographyToken}
                  type={type}
                />
              </StatusBox>
            </RightBox>
          </PositionEntryBox>
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
