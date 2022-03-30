import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@mui/system';

import { data, AugmentedAMM } from '@utilities';
import { AMMProvider } from '@components/contexts';
import { Panel } from '@components/atomic';
import { AMMTableFields } from './types';
import { labels } from './constants';
import { mapAmmToAmmTableDatum } from './utilities';
import { AMMTableFooter, AMMTableHead, AMMTableRow } from './components';

export type AMMTableProps = {
  amms: AugmentedAMM[];
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  orderBy: AMMTableFields;
  onSetOrderBy: (orderBy: AMMTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (datum: AugmentedAMM) => void;
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({
  amms,
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
      paddingTop: (theme) => theme.spacing(2),
      paddingBottom: (theme) => theme.spacing(1),
      '&:first-of-type': {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      '&:last-of-type': {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    },
  };
  const handleSort = (field: AMMTableFields) => {
    onSetOrder(field === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc');
    onSetOrderBy(field);
  };
  const tableData = useMemo(() => {
    return amms.map(mapAmmToAmmTableDatum);
  }, [order, page, size]);
  const handleSelectRow = (index: number) => () => {
    onSelectItem(amms[index]);
  };

  return (
    <Panel variant="dark" sx={{ minWidth: 800 }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: 750,
            borderCollapse: 'separate',
            borderSpacing: '0px 8px',
            ...commonOverrides,
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <AMMTableHead order={order} orderBy={orderBy} onSort={handleSort} />
          <TableBody>
            {tableData.map((datum, index) => (
              <AMMProvider amm={amms[index]}>
                <AMMTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} />
              </AMMProvider>
            ))}
          </TableBody>
          <AMMTableFooter
            columns={labels.length + 1}
            pages={pages}
            page={page}
            onChangePage={onSetPage}
            size={size}
            onChangeSize={onSetSize}
          />
        </Table>
      </TableContainer>
    </Panel>
  );
};

export default AMMTable;
