import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';

import { data, AugmentedAMM } from '@utilities';
import { AMMProvider } from '@contexts';
import { Panel } from '@components/atomic';
import { useAgent } from '@hooks';
import { Agents } from '@contexts';
import { FixedBorrowTableFields } from './types';
import { BorrowTableHead } from './components';
import BorrowPortfolioHeader, {BorrowPortfolioHeaderProps} from '../BorrowPortfolioHeader/BorrowPortfolioHeader';


export type BorrowTableProps = {
  headerProps: BorrowPortfolioHeaderProps | undefined;
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  orderBy: FixedBorrowTableFields;
  onSetOrderBy: (orderBy: FixedBorrowTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
};

const BorrowTable: React.FunctionComponent<BorrowTableProps> = ({
  headerProps,
  order,
  onSetOrder,
  orderBy,
  onSetOrderBy,
  page,
  pages,
  onSetPage,
  size,
  onSetSize,
}) => {
  const commonOverrides: SystemStyleObject<Theme> = {
    '& .MuiTableCell-root': {
      borderColor: 'transparent',
      paddingRight: (theme) => theme.spacing(4),
      paddingLeft: (theme) => theme.spacing(4),
      paddingTop: (theme) => theme.spacing(3),
      paddingBottom: (theme) => theme.spacing(4),
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
      marginBottom: (theme) => theme.spacing(1)
    },
  };
  const handleSort = (field: FixedBorrowTableFields) => {
    onSetOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    onSetOrderBy(field);
  };

  const { agent } = useAgent();
  const _variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark';

    return (
      <Panel variant={_variant} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <BorrowPortfolioHeader
        currencyCode={headerProps.currencyCode}
        currencySymbol={headerProps.currencySymbol}
        aggregatedDebt={headerProps.aggregatedDebt}/>
        <TableContainer>
          <Table
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0px 16px',
              ...commonOverrides,
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <BorrowTableHead order={order} orderBy={orderBy} onSort={handleSort} />
          </Table>
        </TableContainer>
      </Panel>
    );

  
};

export default BorrowTable;
