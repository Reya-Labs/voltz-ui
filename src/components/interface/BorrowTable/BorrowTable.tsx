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
import { FixedBorrowTableFields, labelsFixed, labelsVariable, VariableBorrowTableFields, BorrowAMMTableDatum } from './types';
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

  const replacementRowStyle: SystemStyleObject<Theme> = {
      fontSize: 18,
      fontWeight: '400',
      color: "#48435E",
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: `#151221`,
      borderRadius: 2,
      padding: (theme) => theme.spacing(2),
      marginTop: (theme) => theme.spacing(-3),
      marginBottom: (theme) => theme.spacing(8)
  };

  const tableData = useMemo(() => {
    const unfilteredDatum = borrowAmms.map(mapAmmToAmmTableDatum);
    return unfilteredDatum;
  }, [order, page, size]);

  const renderNoFixedPositions = () => {
      return (
        <Typography variant="body2" sx={{...replacementRowStyle}}>
          YOU DON'T HAVE ANY FIXED DEBT
      </Typography>
      );
  }
  const renderNoVariablePositions = () => {
      return (
        <Typography variant="body2" sx={{...replacementRowStyle}}>
          YOU DON'T HAVE ANY VARIABLE DEBT
      </Typography>
      );
  }

  const renderVariableTable = () => {
    const liveMarkets = tableData.map((datum, index) => {
      if(datum && DateTime.now() < datum.endDate) {
        const position = findCurrentBorrowPosition(positions || [], borrowAmms[index]);
        return {datum: datum, borrowAmms: borrowAmms[index],position: position, index: index}
      }
    })

    const showPositions = (liveMarkets.filter((market) => market !== undefined).length !== 0);
  
    return ( <>
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
          {showPositions && showVariable && renderVariableRows(liveMarkets)}
          </TableBody>
        </Table>
      </TableContainer>
      {(!showPositions || !showVariable) && renderNoVariablePositions()}
    </>
    )
    
  }

  const renderFixedRows = (marketsWithPosition: 
    ({datum: BorrowAMMTableDatum;
    borrowAmms: AugmentedBorrowAMM;
    position: Position;
    index: number;
} | undefined)[]) => {
    return <>
      {marketsWithPosition.map((info) => {
      if (info !== undefined) {
        return (
        
        <BorrowAMMProvider amm={info.borrowAmms}>
          <PositionProvider position={info.position}>
            <BorrowTableRow datum={info.datum} index={info.index} onSelect={handleSelectRow(info.index)} isFixedPositions={true}/>
          </PositionProvider>
        </BorrowAMMProvider>)
      }
    })}
    </>
  } 

  const renderVariableRows = (liveMarkets: 
    ({datum: BorrowAMMTableDatum;
    borrowAmms: AugmentedBorrowAMM;
    position: Position | undefined;
    index: number;
} | undefined)[]) => {
    return <>
      {liveMarkets.map((info) => {
          if (info) {
            return (
            <BorrowAMMProvider amm={info.borrowAmms}>
              <PositionProvider position={info.position}>
                <BorrowTableRow datum={info.datum} index={info.index} onSelect={handleSelectRow(info.index)} isFixedPositions={false} />
              </PositionProvider>
            </BorrowAMMProvider>)
          }
      })}
    </>
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

    const showPositions = (marketsWithPosition.filter((market) => market !== undefined).length !== 0);

    return (<>
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
          {showPositions && showFixed && renderFixedRows(marketsWithPosition)}
        </TableBody>
        </Table>
      </TableContainer>
      {(!showPositions || !showFixed ) && renderNoFixedPositions()}
    </>)
    
  }

  const handleSelectRow = (index: number) => () => {
    onSelectItem(borrowAmms[index]);
  };

  return (
    <Panel variant={'dark'} borderRadius='large' padding='container' sx={{ paddingTop: 0, paddingBottom: 0, background:'transparent' }}>
      {/* VARIABLE POSITIONS TABLE */}
      <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
        <Box sx={{backgroundColor: "#2667FF", borderRadius: "5px", width: '4px', height: '4px', marginTop: '12px', marginRight: '8px'}}></Box>
         VARIABLE POSITIONS
      </Typography>
      {renderVariableTable()}

      {/* FIXED POSITIONS TABLE */}
      <Typography variant="body2" sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center'}}>
        <Box sx={{backgroundColor: "#4DE5FF", borderRadius: "5px", width: '4px', height: '4px', marginTop: '12px', marginRight: '8px'}}></Box>
        FIXED POSITIONS
      </Typography>
      {renderFixedTable()}
    </Panel>
  );

  
};

export default BorrowTable;
