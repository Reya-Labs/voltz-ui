import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';

import { data, AugmentedBorrowAMM, findCurrentBorrowPosition } from '@utilities';
import { mapAmmToAmmTableDatum } from './utilities';
import { BorrowAMMProvider, PositionProvider } from '@contexts';
import { Panel } from '@components/atomic';
import { useAgent } from '@hooks';
import { FixedBorrowTableFields, labelsFixed, labelsVariable, VariableBorrowTableFields } from './types';
import { BorrowTableHead } from './components';
import { DateTime } from 'luxon';
import BorrowTableRow from './components/BorrowTableRow/BorrowTableRow';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';


export type BorrowTableProps = {
  positions: Position[];
  borrowAmms: AugmentedBorrowAMM[];
  order: data.TableOrder;
  onSetOrder: (order: data.TableOrder) => void;
  variableOrderBy: VariableBorrowTableFields;
  onSetVariableOrderBy: (orderBy: VariableBorrowTableFields) => void;
  fixedOrderBy: FixedBorrowTableFields;
  onSetFixedOrderBy: (orderBy: FixedBorrowTableFields) => void;
  page: number;
  pages: number;
  onSetPage: (page: number) => void;
  size: number | null;
  onSetSize: (size: number) => void;
  onSelectItem: (datum: AugmentedBorrowAMM) => void;
  commonOverrides: SystemStyleObject<Theme>;
};

const BorrowTable: React.FunctionComponent<BorrowTableProps> = ({
  positions,
  borrowAmms,
  order,
  onSetOrder,
  variableOrderBy,
  fixedOrderBy,
  page,
  pages,
  onSetPage,
  size,
  onSetSize,
  onSelectItem,
  commonOverrides,
}) => {

  const { agent } = useAgent();

  const tableData = useMemo(() => {
    const unfilteredDatum = borrowAmms.map(mapAmmToAmmTableDatum);
    return unfilteredDatum.filter((datum) => datum !== undefined )
  }, [order, page, size]);

  const handleSelectRow = (index: number) => () => {
    onSelectItem(borrowAmms[index]);
  };

    return (
      <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0 }}>

        {/* VARIABLE POSITIONS TABLE */}
        <Typography variant="body2" sx={{ fontSize: 20, fontWeight: 'bold' }}>VARIABLE POSITIONS</Typography>
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
            <BorrowTableHead order={order} orderBy={variableOrderBy} labels={labelsVariable}/>
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => {
              if (datum && DateTime.now() < datum.endDate) {
                const position = findCurrentBorrowPosition(positions || [], borrowAmms[index]);
                return (<BorrowAMMProvider amm={borrowAmms[index]}>
                  <PositionProvider position={position}>
                    <BorrowTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} isFixedPositions={false} />
                  </PositionProvider>
                </BorrowAMMProvider>)
              }
          })}
          </TableBody>
          </Table>
        </TableContainer>

        {/* FIXED POSITIONS TABLE */}
        <Typography variant="body2" sx={{ fontSize: 20, fontWeight: 'bold' }}>FIXED POSITIONS</Typography>
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
            <BorrowTableHead order={order} orderBy={fixedOrderBy} labels={labelsFixed}/>
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
            {tableData.map((datum, index) => {
              if (datum && DateTime.now() < datum.endDate) {
                const position = findCurrentBorrowPosition(positions || [], borrowAmms[index]);
                if(!position) { return; }
                return (<BorrowAMMProvider amm={borrowAmms[index]}>
                  <PositionProvider position={position}>
                    <BorrowTableRow datum={datum} index={index} onSelect={handleSelectRow(index)} isFixedPositions={true}/>
                  </PositionProvider>
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
