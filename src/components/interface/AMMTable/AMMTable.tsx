import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';

import { AMMProvider, Agents } from '@contexts';
import { Panel } from '@components/atomic';
import { labels } from './constants';
import { mapAmmToAmmTableDatum } from './utilities';
import { AMMTableFooter, AMMTableHead, AMMTableRow } from './components';
import { useAgent } from '@hooks';
import { DateTime } from 'luxon';

import { AMM } from '@voltz-protocol/v1-sdk';

export type AMMTableProps = {
  amms: AMM[];
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (datum: AMM) => void;
};

const AMMTable: React.FunctionComponent<AMMTableProps> = ({
  amms,
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
      marginBottom: (theme) => theme.spacing(1),
    },
  };

  const tableData = useMemo(() => {
    return amms.map(mapAmmToAmmTableDatum);
  }, [page, size]);
  const handleSelectRow = (index: number) => () => {
    onSelectItem(amms[index]);
  };

  const { agent } = useAgent();
  const _variant = agent === Agents.LIQUIDITY_PROVIDER ? 'darker' : 'dark';

  return (
    <Panel
      variant={_variant}
      borderRadius="large"
      padding="container"
      sx={{ paddingTop: 0, paddingBottom: 0 }}
    >
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
          <AMMTableHead />
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => {
              if (DateTime.now() < datum.endDate) {
                return (
                  <AMMProvider amm={amms[index]}>
                    <AMMTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} />
                  </AMMProvider>
                );
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
