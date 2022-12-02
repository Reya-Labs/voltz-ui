import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { BorrowAMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useMemo, useRef } from 'react';

import { BorrowAMMProvider } from '../../../contexts/BorrowAMMContext/BorrowAMMContext';
import { PositionProvider } from '../../../contexts/PositionContext/PositionContext';
import { colors, SystemStyleObject, Theme } from '../../../theme';
import { findCurrentBorrowPosition } from '../../../utilities/borrowAmm';
import { getRowButtonId } from '../../../utilities/googleAnalytics';
import { Panel } from '../../atomic/Panel/Panel';
import { Typography } from '../../atomic/Typography/Typography';
import { BorrowTableHead } from './components';
import { BorrowTableRow } from './components/BorrowTableRow/BorrowTableRow';
import { BorrowAMMTableDatum, labelsFixed, labelsVariable } from './types';
import { mapAmmToAmmTableDatum } from './utilities';

export type BorrowTableProps = {
  showVariable: boolean;
  showFixed: boolean;
  positions: Position[];
  borrowAmms: BorrowAMM[];
  onSelectItem: (datum: BorrowAMM) => void;
  onLoaded: (loaded: boolean) => void;
  commonOverrides: SystemStyleObject<Theme>;
};

const BorrowTable: React.FunctionComponent<BorrowTableProps> = ({
  showVariable,
  showFixed,
  positions,
  borrowAmms,
  onSelectItem,
  onLoaded,
  commonOverrides,
}) => {
  const countLoaded = useRef(-2);
  const counted = useRef({
    fixedRows: false,
    variableRows: false,
    noFixedRows: true,
    noVariableRows: true,
  });

  const replacementRowStyle: SystemStyleObject<Theme> = {
    fontSize: 18,
    fontWeight: '400',
    color: colors.liberty2,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.liberty6,
    borderRadius: 2,
    padding: '10px',
    marginTop: (theme) => theme.spacing(-3),
    marginBottom: (theme) => theme.spacing(8),
  };

  const handleLoadedRow = () => {
    countLoaded.current++;
    if (countLoaded.current === 0) {
      onLoaded(false);
    }
  };

  const tableData = useMemo(() => {
    const unfilteredDatum = borrowAmms.map(mapAmmToAmmTableDatum);
    counted.current.noFixedRows = false;
    counted.current.noVariableRows = false;
    return unfilteredDatum;
  }, [borrowAmms]);

  const renderNoFixedPositions = () => {
    if (!counted.current.noFixedRows) {
      handleLoadedRow();
      counted.current.noFixedRows = true;
    }
    return (
      <Typography sx={{ ...replacementRowStyle }} variant="body2">
        YOU DON'T HAVE ANY FIXED DEBT
      </Typography>
    );
  };
  const renderNoVariablePositions = () => {
    if (!counted.current.noVariableRows && !showFixed) {
      handleLoadedRow();
      counted.current.noVariableRows = true;
    }
    return (
      <Typography sx={{ ...replacementRowStyle }} variant="body2">
        YOU DON'T HAVE ANY VARIABLE DEBT
      </Typography>
    );
  };

  // todo: FB -> incorrect usage of map
  const renderVariableTable = () => {
    const liveMarkets = tableData.map((datum, index) => {
      if (datum && Date.now().valueOf() < datum.endDate.toMillis()) {
        const position = findCurrentBorrowPosition(positions || [], borrowAmms[index].id);
        return { datum: datum, borrowAmms: borrowAmms[index], position: position, index: index };
      }
    });

    const filteredMarkets = liveMarkets.filter((market) => market !== undefined);
    const showPositions = filteredMarkets.length !== 0;

    if (showPositions && showVariable && !counted.current.variableRows) {
      countLoaded.current =
        countLoaded.current + (counted.current.noVariableRows ? 0 : 1) - filteredMarkets.length;
      counted.current.variableRows = true;
    }

    return (
      <>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0px 16px',
              ...commonOverrides,
            }}
          >
            <BorrowTableHead isFixedPositions={false} labels={labelsVariable} />
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
              {showPositions &&
                showVariable &&
                renderVariableRows(liveMarkets.filter((market) => market !== undefined))}
            </TableBody>
          </Table>
        </TableContainer>
        {(!showPositions || !showVariable) && renderNoVariablePositions()}
      </>
    );
  };

  const renderFixedRows = (
    marketsWithPosition: (
      | {
          datum: BorrowAMMTableDatum;
          borrowAmms: BorrowAMM;
          position: Position;
          index: number;
        }
      | undefined
    )[],
  ) => {
    return (
      <>
        {marketsWithPosition.map((info) => {
          if (info !== undefined) {
            return (
              <BorrowAMMProvider amm={info.borrowAmms}>
                <PositionProvider position={info.position}>
                  <BorrowTableRow
                    datum={info.datum}
                    handleLoadedRow={handleLoadedRow}
                    index={info.index}
                    isFixedPositions={true}
                    onSelect={handleSelectRow(info.index)}
                  />
                </PositionProvider>
              </BorrowAMMProvider>
            );
          }
        })}
      </>
    );
  };

  const renderVariableRows = (
    liveMarkets: (
      | {
          datum: BorrowAMMTableDatum;
          borrowAmms: BorrowAMM;
          position: Position | undefined;
          index: number;
        }
      | undefined
    )[],
  ) => {
    return (
      <>
        {liveMarkets.map((info) => {
          if (info) {
            return (
              <BorrowAMMProvider amm={info.borrowAmms}>
                <PositionProvider position={info.position}>
                  <BorrowTableRow
                    datum={info.datum}
                    gaButtonId={getRowButtonId(false, info.datum.protocol, true)}
                    handleLoadedRow={handleLoadedRow}
                    index={info.index}
                    isFixedPositions={false}
                    onSelect={handleSelectRow(info.index)}
                  />
                </PositionProvider>
              </BorrowAMMProvider>
            );
          }
        })}
      </>
    );
  };

  const renderFixedTable = () => {
    const marketsWithPosition = tableData.map((datum, index) => {
      if (datum && Date.now().valueOf() < datum.endDate.toMillis()) {
        const position = findCurrentBorrowPosition(positions || [], borrowAmms[index].id);
        if (position) {
          return { datum: datum, borrowAmms: borrowAmms[index], position: position, index: index };
        }
      }
    });

    const filteredMarkets = marketsWithPosition.filter((market) => market !== undefined);
    const showPositions = filteredMarkets.length !== 0;

    if (showPositions && !counted.current.fixedRows) {
      countLoaded.current =
        countLoaded.current + (counted.current.noFixedRows ? 0 : 1) - filteredMarkets.length;
      counted.current.fixedRows = true;
    }

    return (
      <>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0px 16px',
              ...commonOverrides,
            }}
          >
            <BorrowTableHead isFixedPositions={true} labels={labelsFixed} />
            <TableBody sx={{ position: 'relative', top: (theme) => `-${theme.spacing(3)}` }}>
              {showPositions && renderFixedRows(marketsWithPosition)}
            </TableBody>
          </Table>
        </TableContainer>
        {!showPositions && renderNoFixedPositions()}
      </>
    );
  };

  const handleSelectRow = (index: number) => () => {
    onSelectItem(borrowAmms[index]);
  };

  return (
    <Panel
      borderRadius="large"
      padding="container"
      sx={{ paddingTop: 0, paddingBottom: 0, background: 'transparent' }}
      variant={'dark'}
    >
      {/* VARIABLE POSITIONS TABLE */}
      <Typography
        sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center' }}
        variant="body2"
      >
        <Box
          sx={{
            backgroundColor: colors.ultramarineBlue,
            borderRadius: '5px',
            width: '4px',
            height: '4px',
            marginTop: '12px',
            marginRight: '8px',
          }}
        ></Box>
        VARIABLE POSITIONS
      </Typography>
      {renderVariableTable()}

      {/* FIXED POSITIONS TABLE */}
      <Typography
        sx={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignContent: 'center' }}
        variant="body2"
      >
        <Box
          sx={{
            backgroundColor: colors.skyBlueCrayola,
            borderRadius: '5px',
            width: '4px',
            height: '4px',
            marginTop: '12px',
            marginRight: '8px',
          }}
        ></Box>
        FIXED POSITIONS
      </Typography>
      {renderFixedTable()}
    </Panel>
  );
};

export default BorrowTable;
