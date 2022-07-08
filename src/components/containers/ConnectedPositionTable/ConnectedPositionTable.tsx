/* eslint-disable react-hooks/rules-of-hooks */
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useEffect, useState } from 'react';

import { data } from '@utilities';
import { usePositions, useWallet } from '@hooks';
import { PortfolioHeader, PositionTable, PositionTableFields } from '@components/interface';
import { Button, Loading, Panel, RouteLink, Typography } from '@components/atomic';
import { Agents } from '@contexts';
import { actions } from '@store';
import { useDispatch } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import Box from '@mui/material/Box';
import { getHealthCounters, getNetPayingRate, getNetReceivingRate, getTotalAccruedCashflow, getTotalMargin, getTotalNotional } from './services';
import { colors } from '@theme';

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
  const { status } = useWallet();

  const dispatch = useDispatch();

  const [positionInformation, setPositionInformation] = useState<Record<Position['id'], PositionInfo>>({});
  const [positionInformationLoading, setPositionInformationLoading] = useState<boolean>(true);
  const [positionInformationError, setPositionInformationError] = useState<boolean>(false);

  const loadExtraPositionInformation = () => {
    if (!loading && !error && positionsByAgentGroup) {
      setPositionInformationLoading(true);
      Promise.allSettled(positionsByAgentGroup.map(p => p.amm.getPositionInformation(p)))
        .then((responses) => {
          const piError = !!responses.find(resp => resp.status === 'rejected');

          if(piError) {
            setPositionInformationError(true);
          } else {
            const piData:Record<Position['id'], PositionInfo> = {};
            responses.forEach((resp, i) => {
              if (resp.status === 'fulfilled') {
                piData[positionsByAgentGroup[i].id] = resp.value;
              }
            });
  
            setPositionInformation(piData);
            setPositionInformationError(false);
          }
        })
        .catch((err) => {
          // console.log("error in effect:", err);
        })
        .finally(() => {
          setPositionInformationLoading(false);
        })
    }
  };

  useEffect(() => {
    loadExtraPositionInformation();
  }, [agent, error, loading, !!positionsByAgentGroup]);

  const handleRetry = useCallback(() => {
    loadExtraPositionInformation();
  }, [loadExtraPositionInformation]);
  
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

  if(loading || status === 'connecting' || (positionsByAgentGroup?.length && positionInformationLoading)) {
    return (
      <Panel variant='grey-dashed' sx={{ width: '100%' }}>
        <Loading sx={{ margin: '0 auto' }} />
      </Panel>
    )
  }

  if(positionInformationError) {
    return (
      <Panel variant='error' sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ color: colors.vzCustomRed1, lineHeight: '14px' }}>
          <Button variant='text' onClick={handleRetry} sx={{ fontSize: 'inherit', color: 'inherit', padding: '0', lineHeight: 'inherit' }}>
            FAILED TO LOAD: RETRY?
          </Button>
        </Typography>
      </Panel>
    );
  }

  if(error || status !== 'connected') {
    return (
      <Panel variant='main' sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ color: colors.skyBlueCrayola.base }}>
          CONNECT YOUR WALLET
        </Typography>
      </Panel>
    )
  }

  if (!positionsByAgentGroup) {
    return (
      <Panel variant='main' sx={{ width: '100%', textAlign: 'center' }}>
        <RouteLink to={agent === Agents.LIQUIDITY_PROVIDER ? `/${routes.POOLS}` : `/${routes.SWAP}`}>
          OPEN YOUR FIRST POSITION
        </RouteLink>
      </Panel>
    )
  }

  const healthCounters = getHealthCounters(positionsByAgentGroup, positionInformation);
  const totalNotional = getTotalNotional(positionsByAgentGroup, positionInformation);
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

