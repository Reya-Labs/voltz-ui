import React, { useCallback, useState } from 'react';
import { Position } from '@voltz/v1-sdk';
import { useNavigate } from 'react-router-dom';

import { data } from '@utilities';
import { usePositions } from '@hooks';
import { PositionTable, PositionTableFields } from '@components/interface';
import { Button, Panel, Typography } from '@components/atomic';
import { Agents } from '@components/contexts';
import { Box } from '@mui/material';
import { routes } from '@routes';

export type ConnectedAMMTableProps = {
  onSelectItem: (item: Position) => void;
  agent: Agents
};

const ConnectedPositionTable: React.FunctionComponent<ConnectedAMMTableProps> = ({
  onSelectItem,
  agent
}) => {
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<PositionTableFields>('maturity');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const { positionsByAgent, loading, error } = usePositions();
  const pages = 0;
  const navigate = useNavigate();

  const handleViewPools = useCallback(() => {
    if(agent === Agents.LIQUIDITY_PROVIDER) {
      navigate(`/${routes.POOLS}`);
    } else {
      navigate(`/${routes.SWAP}`);
    }
  }, [useNavigate])

  if(loading || error) {
    return null;
  }

  if (!positionsByAgent) {
    return (
      <Panel variant='dark' sx={{textAlign: 'center'}}>
        <Typography >You do not currently have any positions</Typography>
        <Box sx={{ marginTop: (theme) => theme.spacing(4) }}>
          <Button variant="contained" onClick={handleViewPools} sx={{
            paddingTop: (theme) => theme.spacing(3),
            paddingBottom: (theme) => theme.spacing(3),
            paddingLeft: (theme) => theme.spacing(4),
            paddingRight: (theme) => theme.spacing(4),
            fontSize: 18,
            lineHeight: 1,
            boxShadow: 'none',
          }}>
            VIEW POOLS
          </Button>
        </Box>
      </Panel>
    )
  }

  return (
    <PositionTable
      positions={positionsByAgent}
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
      agent={agent}
    />
  );
};

export default ConnectedPositionTable;

