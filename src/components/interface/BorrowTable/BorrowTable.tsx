import React, { useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import { Box } from '@mui/material';

import { data, AugmentedBorrowAMM, findCurrentBorrowPosition } from '@utilities';
import { mapAmmToAmmTableDatum } from './utilities';
import { BorrowAMMProvider, PositionProvider } from '@contexts';
import { Panel } from '@components/atomic';
import { useAgent } from '@hooks';
import { FixedBorrowTableFields, labelsFixed, labelsVariable, VariableBorrowTableFields } from './types';
import { BorrowTableHead} from './components';
import { DateTime } from 'luxon';
import BorrowTableRow from './components/BorrowTableRow/BorrowTableRow';
import { Position } from '@voltz-protocol/v1-sdk/dist/types/entities';


export type BorrowTableProps = {
  showVariable: boolean;
  showFixed: boolean;
  positions: Position[];
  borrowAmms: AugmentedBorrowAMM[];
  order: data.TableOrder;
  variableOrderBy: VariableBorrowTableFields;
  onSetVariableOrderBy: (orderBy: VariableBorrowTableFields) => void;
  fixedOrderBy: FixedBorrowTableFields;
  onSetFixedOrderBy: (orderBy: FixedBorrowTableFields) => void;
  page: number;
  size: number | null;
  onSelectItem: (datum: AugmentedBorrowAMM) => void;
  commonOverrides: SystemStyleObject<Theme>;
};

const BorrowTable: React.FunctionComponent<BorrowTableProps> = ({
  showVariable,
  showFixed,
  positions,
  borrowAmms,
  order,
  variableOrderBy,
  fixedOrderBy,
  page,
  size,
  onSelectItem,
  commonOverrides,
}) => {

  const { agent } = useAgent();
  let noFixedPositions: boolean = false;
  let noVariablePositions: boolean = false;

  const replacementRowStyle: SystemStyleObject<Theme> = {
      fontSize: 18,
      fontWeight: '400',
      color: "#5A576D",
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: `secondary.darken040`,
      borderRadius: 2,
      padding: (theme) => theme.spacing(2),
      marginBottom: (theme) => theme.spacing(8)
  };

  const tableData = useMemo(() => {
    const unfilteredDatum = borrowAmms.map(mapAmmToAmmTableDatum);
    return unfilteredDatum;
  }, [order, page, size]);

  const renderVariableTable = () => {
    const marketsWithPosition = tableData.map((datum, index) => {
      if(datum && DateTime.now() < datum.endDate) {
        const position = findCurrentBorrowPosition(positions || [], borrowAmms[index]);
        return {datum: datum, borrowAmms: borrowAmms[index],position: position, index: index}
      }
    })

    if (marketsWithPosition.filter((market) => market !== undefined).length == 0) {
      noVariablePositions = true;
    } else {
      return (<>
        {marketsWithPosition.map((info) => {
            if (info) {
              return (<BorrowAMMProvider amm={info.borrowAmms}>
                <PositionProvider position={info.position}>
                  <BorrowTableRow datum={info.datum} index={info.index} onSelect={handleSelectRow(info.index)} isFixedPositions={false} />
                </PositionProvider>
              </BorrowAMMProvider>)
            }
        })}
      </>)
    }
    
  }

  const renderFixedTable = () => {
    const marketsWithPosition = tableData.map((datum, index) => {
      if(datum && DateTime.now() < datum.endDate) {
        const position = findCurrentBorrowPosition(positions || [], borrowAmms[index]);
        if (position) {
          return {datum: datum, borrowAmms: borrowAmms[index], position: position, index: index}
        }
      }
    })

    if (marketsWithPosition.filter((market) => market !== undefined).length == 0) {
      noFixedPositions = true;
    } else {
      return (<>
        {marketsWithPosition.map((info) => {
          if (info !== undefined) {
            return (<BorrowAMMProvider amm={info.borrowAmms}>
              <PositionProvider position={info.position}>
                <BorrowTableRow datum={info.datum} index={info.index} onSelect={handleSelectRow(info.index)} isFixedPositions={true}/>
              </PositionProvider>
            </BorrowAMMProvider>)
          }
        })}
      </>)
    }
    
  }

  const renderNoFixedPositions = () => {
    if (noFixedPositions || !showFixed) {
      return (
        <Typography variant="body2" sx={{...replacementRowStyle}}>
          YOU ARE PAYING VARIABLE ONLY
      </Typography>
      );
      }
  }
  const renderNoVariablePositions = () => {
    if (noVariablePositions || !showVariable) {
      return (
        <Typography variant="body2" sx={{...replacementRowStyle}}>
          YOU DO NOT HAVE ANY DEBT
      </Typography>
      );
      }
  }

  const handleSelectRow = (index: number) => () => {
    onSelectItem(borrowAmms[index]);
  };

  return (
    <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background:'transparent' }}>
z
      {/* VARIABLE POSITIONS TABLE */}
      <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
        <Box sx={{backgroundColor: "#2667FF", borderRadius: "5px", width: '4px', height: '4px', marginTop: '12px', marginRight: '8px'}}></Box>
         VARIABLE POSITIONS
      </Typography>
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
          <BorrowTableHead order={order} orderBy={variableOrderBy} labels={labelsVariable} isFixedPositions={false}/>
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
          {renderVariableTable()}
          </TableBody>
        </Table>
      </TableContainer>
      {renderNoVariablePositions()}

      {/* FIXED POSITIONS TABLE */}
      <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
        <Box sx={{backgroundColor: "#4DE5FF", borderRadius: "5px", width: '4px', height: '4px', marginTop: '12px', marginRight: '8px'}}></Box>
        FIXED POSITIONS
      </Typography>
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
          <BorrowTableHead order={order} orderBy={fixedOrderBy} labels={labelsFixed} isFixedPositions={true}/>
          <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
          {renderFixedTable()}
        </TableBody>
        </Table>
      </TableContainer>
      {renderNoFixedPositions()}
    </Panel>
  );

  
};

export default BorrowTable;
