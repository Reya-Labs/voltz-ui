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
import { useAgent } from '@hooks';
import { Agents } from '@components/contexts';
import { DateTime } from 'luxon';


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

  const { agent } = useAgent();
  const _variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark';

  return (
    <Panel variant={_variant} borderRadius='large' padding='container' sx={{ minWidth: 800, marginTop: 10, paddingTop: 0, paddingBottom: 0 }}>
      <TableContainer>
        <Table
          sx={{
            minWidth: 750,
            borderCollapse: 'separate',
            borderSpacing: '0px 16px',
            ...commonOverrides,
          }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <AMMTableHead order={order} orderBy={orderBy} onSort={handleSort} />
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => {
              if (DateTime.now() < datum.endDate) {
                return <AMMProvider amm={amms[index]}>
                  <AMMTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} />
                </AMMProvider>
              }
          })}
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
