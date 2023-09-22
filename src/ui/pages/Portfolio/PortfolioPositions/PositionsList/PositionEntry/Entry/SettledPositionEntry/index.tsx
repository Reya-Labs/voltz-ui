import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Dialog, TypographyToken } from 'brokoli-ui';
import React, { useState } from 'react';

import { MAX_POOL_CAP } from '../../../../../../../../app/features/aMMs';
import { PositionUI } from '../../../../../../../../app/features/portfolio/types';
import { ChainIcon } from '../../../../../../../components/ChainIcon';
import { TestNetIndicator } from '../../../../../../../components/TestNetIndicator';
import { V2EntryInformation } from '../../../../../../../components/V2EntryInformation';
import { useResponsiveQuery } from '../../../../../../../hooks/useResponsiveQuery';
import { HealthIndicator } from '../../HealthIndicator';
import { MarketTokenInformation } from '../../MarketTokenInformation';
import {
  ChainIconContainer,
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
      isV2,
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

    const chainIcon = (
      <ChainIcon
        chainId={chainId}
        hideForChains={[SupportedChainId.mainnet, SupportedChainId.goerli]}
      />
    );
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
          {chainIcon ? <ChainIconContainer>{chainIcon}</ChainIconContainer> : null}
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
          {isV2 ? <V2EntryInformation chainId={chainId} poolCap={MAX_POOL_CAP} /> : null}
        </PositionEntryBoxWrapper>
      </React.Fragment>
    );
  },
);
