import Box from '@mui/material/Box';
import { BorrowAMM } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { Agents } from '../../../contexts/AgentContext/types';
import { useBorrowAMMs } from '../../../hooks/useBorrowAMMs';
import { useBorrowPositions } from '../../../hooks/useBorrowPositions';
import { useWallet } from '../../../hooks/useWallet';
import { SystemStyleObject, Theme } from '../../../theme';
import { Loading } from '../../atomic/Loading/Loading';
import { Panel } from '../../atomic/Panel/Panel';
import {
  BorrowPortfolioHeader,
  BorrowPortfolioHeaderProps,
} from '../../interface/BorrowPortfolioHeader/BorrowPortfolioHeader';
import BorrowTable from '../../interface/BorrowTable/BorrowTable';
import { getTotalFixedDebt, getTotalVariableDebt } from './services';

export type ConnectedBorrowAMMTableProps = {
  onSelectItem: (item: BorrowAMM) => void;
  agent: Agents;
};

export const ConnectedBorrowPositionTable: React.FunctionComponent<ConnectedBorrowAMMTableProps> =
  ({ onSelectItem }) => {
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
              borrowAmms={borrowAmms}
              commonOverrides={commonOverrides}
              positions={positions}
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
