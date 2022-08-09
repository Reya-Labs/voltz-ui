import React, { useEffect, useState } from 'react';


import { AugmentedBorrowAMM, data } from '@utilities';
import { useBorrowAMMs, usePositions } from '@hooks';
import { Agents } from '@contexts';
import { Loading, Panel } from '@components/atomic';
import BorrowTable from 'src/components/interface/BorrowTable/BorrowTable';
import { VariableBorrowTableFields } from 'src/components/interface/BorrowTable/types';
import {BorrowPortfolioHeaderProps} from 'src/components/interface/BorrowPortfolioHeader/BorrowPortfolioHeader';
import { getTotalAggregatedDebt } from './services';


export type ConnectedBorrowAMMTableProps = {
  onSelectItem: (item: AugmentedBorrowAMM) => void;
  agent: Agents;
};

const ConnectedBorrowPositionTable: React.FunctionComponent<ConnectedBorrowAMMTableProps> = ({
  onSelectItem,
  agent
}) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [orderBy, setOrderBy] = useState<VariableBorrowTableFields>('debt');

  const { borrowAmms, loading, error } = useBorrowAMMs();
  const { positions, loading: loadingPos, error: errorPos } = usePositions();
  const [aggregatedDebt, setAggregatedDebt] = useState<number>();
  const [headerProps, setHeaderProps] = useState<BorrowPortfolioHeaderProps>();

  const loadDebt = () => {
    if(!loadingPos && !errorPos && !loading && !error && positions && borrowAmms) {
      const request = getTotalAggregatedDebt(borrowAmms, positions);
      request.then((response) => {
        setAggregatedDebt(response);
      });
    }
  }

  useEffect(() => {
    loadDebt();
  }, [borrowAmms, error, loading, positions, loadingPos, errorPos]);

  useEffect(() => {
    if(aggregatedDebt) {
      setHeaderProps({
        currencyCode:'USD',
      currencySymbol:'$',
      aggregatedDebt: aggregatedDebt});
    }
  }, [aggregatedDebt]);

  if (!borrowAmms || loading || error) {
    return null;
  }

  const pages = 0;

  const renderContent = () => {
    if(aggregatedDebt && headerProps){
      return (
        <>
        <BorrowTable
          borrowAmms={borrowAmms}
          headerProps={headerProps}
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
        />
        </>
      )
    } else{
      return (
        <>
        <Panel variant='grey-dashed' sx={{ width: '100%' }}>
          <Loading sx={{ margin: '0 auto' }} />
        </Panel>
        </>
        
      );
    }
  }

  return renderContent();
 
};

export default ConnectedBorrowPositionTable;

