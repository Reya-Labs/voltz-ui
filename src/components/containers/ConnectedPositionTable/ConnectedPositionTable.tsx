import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { data } from '@utilities';
import { usePositions, useSelector, useWallet } from '@hooks';
import { PendingTransaction, PortfolioHeader, PositionTable, PositionTableFields } from '@components/interface';
import { Button, Loading, Panel, RouteLink, Typography } from '@components/atomic';
import { Agents } from '@contexts';
import { actions, selectors } from '@store';
import { useDispatch } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import Box from '@mui/material/Box';
import { getHealthCounters, getNetPayingRate, getNetReceivingRate, getTotalAccruedCashflow, getTotalMargin, getTotalNotional } from './services';
import { colors } from '@theme';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position, mode: 'margin' | 'liquidity' | 'rollover') => void;
  agent: Agents
  amm?: AugmentedAMM;
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
  agent
}) => {
  const extraInfoRequest = useRef<Promise<PromiseSettledResult<PositionInfo>[]>>();
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgentGroup, loading, error } = usePositions();
  const pages = 0;
  const { status } = useWallet();
  
  const [positionToSettle, setPositionToSettle] = useState<{txId: string, position: Position} | undefined>();
  const activeTransaction = useSelector(selectors.transactionSelector)(positionToSettle?.txId); // contains a failureMessage attribute that will contain whatever came out from the sdk
  const dispatch = useDispatch();

  const [positionInformation, setPositionInformation] = useState<Record<Position['id'], PositionInfo>>({});
  const [positionInformationLoading, setPositionInformationLoading] = useState<boolean>(true);
  const [positionInformationError, setPositionInformationError] = useState<boolean>(false);

  const loadExtraPositionInformation = () => {
    if (!loading && !error && positionsByAgentGroup) {
      setPositionInformationLoading(true);
      const thisRequest = Promise.allSettled(positionsByAgentGroup.map(p => p.amm.getPositionInformation(p)));
      extraInfoRequest.current = thisRequest;

      thisRequest.then((responses) => {
        if(thisRequest === extraInfoRequest.current) {
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
        }
      })
      .catch((err) => {
        // console.log("error in effect:", err);
      })
      .finally(() => {
        if(thisRequest === extraInfoRequest.current) {
          setPositionInformationLoading(false);
        }
      })
    }
  };

  useEffect(() => {
    loadExtraPositionInformation();
  }, [agent, error, loading, positionsByAgentGroup]);

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
      const settlePositionAction = actions.settlePositionAction(positionAmm, transaction);
      setPositionToSettle({
        position,
        txId: settlePositionAction.payload.transaction.id
      });
      dispatch(settlePositionAction);
    },
    [dispatch, agent]
  );

  const handleTransactionFinished = () => {
    if(positionToSettle) {
      const action = actions.closeTransaction(positionToSettle.txId);
      dispatch(action);
      setPositionToSettle(undefined);
    }
  }

  const renderConnectWallet = () => {
    return (
      <Panel variant='main' sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ color: colors.skyBlueCrayola.base }}>
          CONNECT YOUR WALLET
        </Typography>
      </Panel>
    )
  }

  const renderFailure = () => {
    return (
      <Panel variant='error' sx={{ width: '100%', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ color: colors.vzCustomRed1, lineHeight: '14px' }}>
          <Button variant='text' onClick={handleRetry} sx={{ fontSize: 'inherit', color: 'inherit', padding: '0', lineHeight: 'inherit' }}>
            FAILED TO LOAD: RETRY?
          </Button>
        </Typography>
      </Panel>
    );
  };

  const renderLoading = () => {
    return (
      <Panel variant='grey-dashed' sx={{ width: '100%' }}>
        <Loading sx={{ margin: '0 auto' }} />
      </Panel>
    )
  };

  const renderNoPositions = () => {
    return (
      <Panel variant='main' sx={{ width: '100%', textAlign: 'center' }}>
        <RouteLink to={agent === Agents.LIQUIDITY_PROVIDER ? `/${routes.POOLS}` : `/${routes.SWAP}`}>
          OPEN YOUR FIRST POSITION
        </RouteLink>
      </Panel>
    )
  }

  const renderPendingTransaction = () => {
    if(!positionToSettle) return null;

    const spData = positionInformation[positionToSettle.position.id];

    return (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <PendingTransaction
          amm={positionToSettle.position.amm as AugmentedAMM}
          isEditingMargin={false}
          isSettle={true}
          transactionId={positionToSettle.txId}
          onComplete={handleTransactionFinished}
          notional={Math.abs(positionToSettle.position.effectiveVariableTokenBalance)}
          margin={spData.margin}
          onBack={handleTransactionFinished}
        />
      </Box>
    );
  }

  const renderPositionTable = () => {
    if(!positionsByAgentGroup) return null;

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
            onSettle={handleSettle}
            agent={agent}
          />
        </Box>
      </>
    );
  }

  const renderContent = () => {
    let content:ReactNode = null;

    if(activeTransaction && positionToSettle) {
      return renderPendingTransaction(); // We return this one immediately as we dont want it wrapped in a Panel
    }

    else if(loading || status === 'connecting' || (positionsByAgentGroup?.length && positionInformationLoading)) {
      content = renderLoading();
    }

    else if(positionInformationError) {
      content = renderFailure();
    }

    else if(error || status !== 'connected') {
      content = renderConnectWallet();
    }

    else if (!positionsByAgentGroup) {
      content = renderNoPositions();
    }

    else {
      content = renderPositionTable();
    }

    return (
      <Panel variant='dark' sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        {content}
      </Panel>
    )
  }

  return renderContent();
};

export default ConnectedPositionTable;

