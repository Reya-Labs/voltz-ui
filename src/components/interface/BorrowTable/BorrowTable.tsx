import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';

import { data, AugmentedBorrowAMM } from '@utilities';
import { mapAmmToAmmTableDatum } from './utilities';
import { BorrowAMMProvider } from '@contexts';
import { Panel } from '@components/atomic';
import { useAgent } from '@hooks';
import { Agents } from '@contexts';
import { VariableBorrowTableFields } from './types';
import { BorrowTableHead } from './components';
import BorrowPortfolioHeader, {BorrowPortfolioHeaderProps} from '../BorrowPortfolioHeader/BorrowPortfolioHeader';
import { DateTime } from 'luxon';
import BorrowTableRow from './components/BorrowTableRow/BorrowTableRow';


export type BorrowTableProps = {
  headerProps: BorrowPortfolioHeaderProps;
  borrowAmms: AugmentedBorrowAMM[];
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  orderBy: VariableBorrowTableFields;
  onSetOrderBy: (orderBy: VariableBorrowTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (datum: AugmentedBorrowAMM) => void;
};

const BorrowTable: React.FunctionComponent<BorrowTableProps> = ({
  headerProps,
  borrowAmms,
  order,
  onSetOrder,
  orderBy,
  onSetOrderBy,
  page,
  pages,
  onSetPage,
  size,
  onSetSize,
  onSelectItem,
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
  const handleSort = (field: VariableBorrowTableFields) => {
    onSetOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    onSetOrderBy(field);
  };

  const { agent } = useAgent();
  const _variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark';

  const tableData = useMemo(() => {
    const unfilteredDatum = borrowAmms.map(mapAmmToAmmTableDatum);
    return unfilteredDatum.filter((datum) => datum !== undefined )
  }, [order, page, size]);

  const handleSelectRow = (index: number) => () => {
    onSelectItem(borrowAmms[index]);
  };

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
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => {
              if (datum && DateTime.now() < datum.endDate) {
                return (<BorrowAMMProvider amm={borrowAmms[index]}>
                  <BorrowTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} />
                </BorrowAMMProvider>)
              }
          })}
          </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    );

  
};

export default BorrowTable;
