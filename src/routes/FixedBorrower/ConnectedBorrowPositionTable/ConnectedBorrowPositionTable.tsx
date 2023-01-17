import Box from '@mui/material/Box';
import { BorrowAMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import {
  BorrowPortfolioHeader,
  BorrowPortfolioHeaderProps,
} from '../../../components/interface/BorrowPortfolioHeader/BorrowPortfolioHeader';
import { useAMMs } from '../../../hooks/useAMMs';
import { useWallet } from '../../../hooks/useWallet';
import { SystemStyleObject, Theme } from '../../../theme';
import { BorrowTable } from './BorrowTable/BorrowTable';
import { getTotalFixedDebt, getTotalVariableDebt } from './services';

export type ConnectedBorrowAMMTableProps = {
  onSelectItem: (item: BorrowAMM) => void;
  borrowPositions: Position[];
  errorPositions: boolean;
  loadingPositions: boolean;
};

export const ConnectedBorrowPositionTable: React.FunctionComponent<ConnectedBorrowAMMTableProps> =
  ({ borrowPositions, errorPositions, loadingPositions, onSelectItem }) => {
    const [loadingItems, setLoadingItems] = useState<boolean>(true);

    const { borrowAMMs, loading, error } = useAMMs();
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
      if (
        !loadingPositions &&
        !errorPositions &&
        !loading &&
        !error &&
        borrowPositions &&
        borrowAMMs
      ) {
        const requestVariable = getTotalVariableDebt(borrowAMMs, borrowPositions);
        requestVariable.then(([varDebt, varPositionsCount]) => {
          const requestFixed = getTotalFixedDebt(borrowAMMs, borrowPositions);
          requestFixed.then(([fixDebt, fixPositionsCount]) => {
            setHeaderProps({
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
    }, [borrowAMMs, error, loading, borrowPositions, loadingPositions, errorPositions]);

    if (!borrowAMMs || loading || error) {
      return null;
    }

    if (
      wallet.status !== 'connecting' &&
      borrowAMMs &&
      borrowPositions &&
      !loading &&
      !loadingPositions &&
      !loading &&
      !error
    ) {
      return (
        <Panel
          padding="small"
          sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'transparent' }}
          variant="dark"
        >
          <BorrowPortfolioHeader
            currencyCode={headerProps.currencyCode}
            currencySymbol={headerProps.currencySymbol}
            fixedDebt={headerProps.fixedDebt}
            fixedPositionsCount={headerProps.fixedPositionsCount}
            loading={loadingItems}
            variableDebt={headerProps.variableDebt}
            variablePositionsCount={headerProps.variablePositionsCount}
          />
          <Box sx={{ marginTop: (theme) => theme.spacing(8) }}>
            <BorrowTable
              borrowAmms={borrowAMMs}
              commonOverrides={commonOverrides}
              positions={borrowPositions}
              showFixed={headerProps.fixedPositionsCount === undefined}
              showVariable={
                headerProps.variablePositionsCount !== undefined &&
                headerProps.variablePositionsCount > 0
              }
              onLoaded={setLoadingItems}
              onSelectItem={onSelectItem}
            />
          </Box>
        </Panel>
      );
    }

    return (
      <Panel
        padding="small"
        sx={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          background: 'transparent',
          marginBottom: '600px',
        }}
        variant="grey-dashed"
      >
        <Loading />
      </Panel>
    );
  };
