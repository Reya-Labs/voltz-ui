import { Dialog, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { PositionUI } from '../../../../../../../../app/features/portfolio/types';
import { useResponsiveQuery } from '../../../../../../../../hooks/useResponsiveQuery';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { V2EntryInformation } from '../../../../../../../components/V2EntryInformation';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ChainIconContainer,
  LeftBox,
  MarginBox,
  MaturityBox,
  PositionEntryBox,
  PositionEntryBoxWrapper,
  RealizedPNLBox,
  RightBox,
  StatusBox,
} from '../../PositionEntry.styled';
import { PositionMargin } from '../../PositionMargin';
import { PositionMaturity } from '../../PositionMaturity';
import { PositionRealizedPNLDetails } from '../../PositionRealizedPNLDetails';
import { PositionStatus } from '../../PositionStatus';
import { PositionTransactionHistoryDialogContent } from '../PositionTransactionHistoryDialogContent';
import { EntryProps } from '../types';

export const MaturedPositionEntry = React.forwardRef<HTMLDivElement, EntryProps>(
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
      isV2,
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
    },
    ref,
  ) => {
    const [transactionHistoryDialogOpen, setTransactionHistoryDialogOpen] = useState(false);
    const { isLargeDesktopDevice } = useResponsiveQuery();
    const numbersTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'secondaryBodyMediumRegular'
      : 'secondaryBodySmallRegular';
    const textsTypographyToken: TypographyToken = isLargeDesktopDevice
      ? 'primaryBodyMediumRegular'
      : 'primaryBodySmallRegular';

    const chainIcon = <ChainIcon chainId={chainId} />;
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
          {chainIcon ? <ChainIconContainer>{chainIcon}</ChainIconContainer> : null}
          <HealthIndicator health={status.health} />
          <PositionEntryBox backgroundColorToken={backgroundColorToken}>
            <LeftBox>
              <MarketTokenInformation
                isBorrowing={isBorrowing}
                market={market}
                token={token}
                type={type}
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
              <MarginBox>
                <PositionMargin
                  marginUSDCompactFormat={marginUSDCompactFormat}
                  typographyToken={numbersTypographyToken}
                />
              </MarginBox>
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
          {isV2 ? <V2EntryInformation poolCap={1000000} /> : null}
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);