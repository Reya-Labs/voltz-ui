/* eslint-disable react-hooks/rules-of-hooks */
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useEffect, useState } from 'react';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PortfolioHeader, PositionTable, PositionTableFields } from '@components/interface';
import { Panel, RouteLink, Typography } from '@components/atomic';
import { Agents } from '@components/contexts';
import { actions } from '@store';
import { useDispatch } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { Box } from '@mui/material';
import { getHealthCounters, getNetPayingRate, getNetReceivingRate, getTotalAccruedCashflow, getTotalMargin, getTotalNotional } from './services';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity') => void;
  agent: Agents
  amm?: AugmentedAMM;
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
  agent
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgentGroup, loading, error } = usePositions();
  const pages = 0;

  const dispatch = useDispatch();

  const [positionInformation, setPositionInformation] = useState<Record<Position['id'], PositionInfo>>({});
  const [positionInformationLoading, setPositionInformationLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && !error && positionsByAgentGroup) {
      setPositionInformationLoading(true);
      Promise.allSettled(positionsByAgentGroup.map(p => p.amm.getPositionInformation(p)))
        .then((responses) => {
          const piData:Record<Position['id'], PositionInfo> = {};
          responses.forEach((resp, i) => {
            if (resp.status === 'fulfilled') {
              piData[positionsByAgentGroup[i].id] = resp.value;
            }
          })
          setPositionInformation(piData);
        })
        .catch((err) => {
          // console.log("error in effect:", err);
        })
        .finally(() => {
          setPositionInformationLoading(false);
        })
    }
  }, [agent, error, loading, !!positionsByAgentGroup]);
  
  const handleSettle = useCallback(
    (position: Position) => {

      const positionAmm = position.amm as AugmentedAMM;
      const transaction = {
        notional: 0, 
        margin: 0,  
        ammId: positionAmm.id, 
        agent, 
        source: position.source, 
        fixedLow: position.fixedRateLower.toNumber(), 
        fixedHigh: position.fixedRateUpper.toNumber()
      };
      const settlePosition = actions.settlePositionAction(positionAmm, transaction);
    
      dispatch(settlePosition);
    },  [dispatch, agent],
  );

  if(loading || positionInformationLoading) {
    return <Typography>Loading...</Typography>;
  }

  if(error) {
    return null;
  }

  if (!positionsByAgentGroup) {
    return (
      <Panel variant='dark' sx={{textAlign: 'center' }}>
        <Panel variant='main' sx={{
          width: '100%', 
          maxWidth: '900px', 
          textAlign: 'center',
        }}>
          <RouteLink to={agent === Agents.LIQUIDITY_PROVIDER ? `/${routes.POOLS}` : `/${routes.SWAP}`}>
            OPEN YOUR FIRST POSITION
          </RouteLink>
        </Panel>
      </Panel>
    )
  }

  const healthCounters = getHealthCounters(positionsByAgentGroup, positionInformation);
  const totalNotional = getTotalNotional(positionsByAgentGroup, agent);
  const totalMargin = getTotalMargin(positionsByAgentGroup, positionInformation);
  const totalAccruedCashflow = getTotalAccruedCashflow(positionsByAgentGroup, positionInformation);
  const netReceivingRate = getNetReceivingRate(positionsByAgentGroup, positionInformation, agent);
  const netPayingRate = getNetPayingRate(positionsByAgentGroup, positionInformation, agent);

  return (
    <>
      <PortfolioHeader
        currencyCode='USD'
        currencySymbol='$'
        netMargin={totalMargin}
        netMarginDiff={agent === Agents.LIQUIDITY_PROVIDER ? totalAccruedCashflow : totalAccruedCashflow}
        netNotional={totalNotional}
        netRateReceiving={agent !== Agents.LIQUIDITY_PROVIDER ? netReceivingRate : undefined}
        netRatePaying={agent !== Agents.LIQUIDITY_PROVIDER ? netPayingRate : undefined}
        feesApy={agent === Agents.LIQUIDITY_PROVIDER ? 3.55 : undefined}
        positionsDanger={healthCounters.danger}
        positionsHealthy={healthCounters.healthy}
        positionsWarning={healthCounters.warning}
      />
      <Box sx={{ marginTop: (theme) => theme.spacing(14) }}>
        <PositionTable
          positions={positionsByAgentGroup}
          positionInformation={positionInformation}
          order={order}
          onSetOrder={setOrder}
          orderBy={orderBy}
          onSetOrderBy={setOrderBy}
          page={page}
          pages={pages}
          onSetPage={setPage}
          size={size}
          onSetSize={setSize}
          onSelectItem={onSelectItem}
          handleSettle={handleSettle}
          agent={agent}
        />
      </Box>
    </>
  );
};

export default ConnectedPositionTable;

