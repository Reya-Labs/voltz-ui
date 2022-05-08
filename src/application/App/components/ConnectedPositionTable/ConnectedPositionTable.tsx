/* eslint-disable react-hooks/rules-of-hooks */
import { Position, PositionInfo } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useEffect, useState } from 'react';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PortfolioHeader, PositionTable, PositionTableFields } from '@components/interface';
import { Panel } from '@components/atomic';
import { Agents } from '@components/contexts';
import { actions } from '@store';
import { useDispatch } from '@hooks';
import { AugmentedAMM } from '@utilities';
import { routes } from '@routes';
import { RouteLink } from '@components/atomic';
import { Box } from '@mui/material';
import { isUndefined } from 'lodash';

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

  const [positionInformation, setPositionInformation] = useState<PositionInfo[]>([]);
  const [positionInformationLoading, setPositionInformationLoading] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // console.log("in effect...");
    // console.log("agent", agent.toString());
    // console.log("error", error.toString());
    // console.log("loading", loading.toString());
    // console.log("position by agent:", positionsByAgentGroup);
    if (!loading && !error && positionsByAgentGroup) {
      setPositionInformationLoading(true);
      Promise.allSettled(positionsByAgentGroup.map(p => p.amm.getPositionInformation(p)))
        .then((responses) => {
          const pi = responses.map((r) => {
            if (r.status === "rejected") {
              throw new Error(r.status);
            }
            else {
              return r.value;
            }
          });

          console.log("pi", pi);
          setPositionInformation(pi);
          setPositionInformationLoading(false);
        })
        .catch((err) => {
          console.log("error in effect:", err);
          setPositionInformationLoading(false);
        });
    }
    // console.log("exiting effect...");
    // console.log();
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

  if(loading || error || positionInformationLoading) {
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

  console.log("positionInformation", positionInformation);
  console.log("positionsByAgentGroup", positionsByAgentGroup);

  if (positionsByAgentGroup.length !== positionInformation.length) {
    return null;
  }

  let healthyPositions = 0;
  let warningPositions = 0;
  let dangerPositions = 0;
  let totalNotional = 0;
  let totalMargin = 0;
  let totalAccruedCashflow = 0;
  let netReceivingRate = 0;
  let netPayingRate = 0;

  for (let i = 0; i < positionsByAgentGroup.length; i++) {
    if (!isUndefined(positionInformation[i].healthFactor)) {
      if (positionInformation[i].healthFactor === 1) {
        dangerPositions += 1;
      }
      if (positionInformation[i].healthFactor === 2) {
        warningPositions += 1;
      }
      if (positionInformation[i].healthFactor === 3) {
        healthyPositions += 1;
      }
    }

    if (agent === Agents.LIQUIDITY_PROVIDER) {
      totalNotional += positionsByAgentGroup[i].notional;
    }
    else {
      totalNotional += Math.abs(positionsByAgentGroup[i].effectiveVariableTokenBalance);
      totalAccruedCashflow += positionInformation[i].accruedCashflow;

      const fr = positionInformation[i].fixedRateSinceLastSwap;
      if (!isUndefined(fr)) {
        if (positionsByAgentGroup[i].positionType === 1) {
          netReceivingRate += fr * Math.abs(positionsByAgentGroup[i].effectiveVariableTokenBalance);
        }
        else {
          netPayingRate += fr * Math.abs(positionsByAgentGroup[i].effectiveVariableTokenBalance);
        }
      }

      const vr = positionInformation[i].variableRateSinceLastSwap;
      if (!isUndefined(vr)) {
        if (positionsByAgentGroup[i].positionType === 1) {
          netPayingRate += vr * Math.abs(positionsByAgentGroup[i].effectiveVariableTokenBalance);
        }
        else {
          netReceivingRate += vr * Math.abs(positionsByAgentGroup[i].effectiveVariableTokenBalance)
        }
      }
    }
    totalMargin += positionInformation[i].margin;
  }

  if (agent !== Agents.LIQUIDITY_PROVIDER) {
    if (totalNotional > 0) {
      netPayingRate /= totalNotional;
      netReceivingRate /= totalNotional;
    }
  }

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
        positionsDanger={dangerPositions}
        positionsHealthy={healthyPositions}
        positionsWarning={warningPositions}
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

