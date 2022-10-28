import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@theme';

import { AugmentedBorrowAMM, data } from '@utilities';
import { useBorrowAMMs, useBorrowPositions, useWallet } from '@hooks';
import { Agents } from '@contexts';
import { Loading, Panel } from '@components/atomic';
import BorrowTable from '../../../components/interface/BorrowTable/BorrowTable';
import {
  FixedBorrowTableFields,
  VariableBorrowTableFields,
} from '../../../components/interface/BorrowTable/types';
import { getTotalVariableDebt, getTotalFixedDebt } from './services';
import BorrowPortfolioHeader, {
  BorrowPortfolioHeaderProps,
} from '../../../components/interface/BorrowPortfolioHeader/BorrowPortfolioHeader';

export type ConnectedBorrowAMMTableProps = {
  onSelectItem: (item: AugmentedBorrowAMM) => void;
  agent: Agents;
};

const ConnectedBorrowPositionTable: React.FunctionComponent<ConnectedBorrowAMMTableProps> = ({
  onSelectItem,
  agent,
}) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [order, setOrder] = useState<data.TableOrder>('desc');
  const [variableOrderBy, setVariableOrderBy] = useState<VariableBorrowTableFields>('debt');
  const [fixedOrderBy, setFixedOrderBy] = useState<FixedBorrowTableFields>('debt');
  const [loadingItems, setLoadingItems] = useState<boolean>(true);

  const { borrowAmms, loading, error } = useBorrowAMMs();
  const { positions, loading: loadingPos, error: errorPos } = useBorrowPositions();
  const wallet = useWallet();

  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(2.5),
      paddingBottom: (theme) => theme.spacing(2.5),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
    '.MuiInputLabel-root': {
      marginBottom: (theme) => theme.spacing(1),
    },
  };
  const defaultHeaderProps = {
    commonOverrides: commonOverrides,
    currencyCode: 'USD',
    currencySymbol: '$',
    loading: true,
  };
  const [headerProps, setHeaderProps] = useState<BorrowPortfolioHeaderProps>(defaultHeaderProps);

  const loadBorrowPositionsSummary = () => {
    if (!loadingPos && !errorPos && !loading && !error && positions && borrowAmms) {
      const requestVariable = getTotalVariableDebt(borrowAmms, positions);
      requestVariable.then(([varDebt, varPositionsCount]) => {
        const requestFixed = getTotalFixedDebt(borrowAmms, positions);
        requestFixed.then(([fixDebt, fixPositionsCount]) => {
          setHeaderProps({
            commonOverrides: commonOverrides,
            currencyCode: 'USD',
            currencySymbol: '$',
            fixedDebt: fixDebt,
            variableDebt: varDebt,
            fixedPositionsCount: fixPositionsCount,
            variablePositionsCount: varPositionsCount,
          });
        });
      });
    }
  };

  useEffect(() => {
    loadBorrowPositionsSummary();
  }, [borrowAmms, error, loading, positions, loadingPos, errorPos]);

  if (!borrowAmms || loading || error) {
    return null;
  }

  const pages = 0;

  const renderContent = () => {
    if (
      wallet.status !== 'connecting' &&
      borrowAmms &&
      positions &&
      !loadingPos &&
      !errorPos &&
      !loading &&
      !error
    ) {
      return (
        <>
          <Panel
            variant="dark"
            padding="small"
            sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}
          >
            <BorrowPortfolioHeader
              commonOverrides={headerProps.commonOverrides}
              currencyCode={headerProps.currencyCode}
              currencySymbol={headerProps.currencySymbol}
              fixedDebt={headerProps.fixedDebt}
              variableDebt={headerProps.variableDebt}
              fixedPositionsCount={headerProps.fixedPositionsCount}
              variablePositionsCount={headerProps.variablePositionsCount}
              loading={loadingItems}
            />
            <Box sx={{ marginTop: (theme) => theme.spacing(8) }}>
              <BorrowTable
                showVariable={
                  headerProps.variablePositionsCount !== undefined &&
                  headerProps.variablePositionsCount > 0
                }
                showFixed={headerProps.fixedPositionsCount === undefined}
                positions={positions}
                borrowAmms={borrowAmms}
                order={order}
                variableOrderBy={variableOrderBy}
                onSetVariableOrderBy={setVariableOrderBy}
                fixedOrderBy={fixedOrderBy}
                onSetFixedOrderBy={setFixedOrderBy}
                page={page}
                size={size}
                onSelectItem={onSelectItem}
                commonOverrides={commonOverrides}
                onLoaded={setLoadingItems}
              />
            </Box>
          </Panel>
        </>
      );
    } else {
      return (
        <>
          <Panel
            variant="grey-dashed"
            padding="small"
            sx={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
              background: 'transparent',
              marginBottom: '600px',
            }}
          >
            <Loading sx={{ margin: '0 auto' }} />
          </Panel>
        </>
      );
    }
  };

  return renderContent();
};

export default ConnectedBorrowPositionTable;
