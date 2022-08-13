import React, { useEffect, useState }  from 'react';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Agents } from '@contexts';
import { Button } from '@components/atomic';
import { PoolField } from '@components/composite';
import { useWallet } from '@hooks';
import { BorrowAMMTableDatum, labelsVariable, VariableBorrowTableFields, FixedBorrowTableFields, labelsFixed } from '../../types';
import { BorrowVariableAPY, BorrowFixedAPR, Debt, BorrowMaturity } from './components';
import Pool from './components/Pool/Pool';
import { useBorrowAMMContext, usePositionContext } from '@contexts';

export type BorrowTableRowProps = {
  datum: BorrowAMMTableDatum;
  index: number;
  isFixedPositions: boolean;
  onSelect: () => void;
};


// todo: panel component, adjust the styling
const BorrowTableRow: React.FunctionComponent<BorrowTableRowProps> = ({ datum, index, onSelect, isFixedPositions }) => {
  const wallet = useWallet();
  const variant = 'main';
  const { variableDebt } = useBorrowAMMContext();
  const { position } = usePositionContext();
  const { result, loading, call } = variableDebt;

  useEffect(() => {
    if (wallet.status === "connected") {
      call(position);
    }
  }, [call, position, wallet.status]);
  
  // add object to sx prop
  // todo:
  // 
  // const anotherObject = {
  //   margin: ... 
  // }

  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!variant) {
      return {
        backgroundColor: `primary.dark`,
      };
    }
    if (variant == 'main') {
      return {
        backgroundColor: `secondary.darken040`, // this affects the colour of the Pool table rows
        borderRadius: 2
      };
    }
    return {};
  };


  const handleClick = () => {
    if (isNull(wallet.account)) {
      wallet.setRequired(true);
    } else {
      onSelect();
    }
  };

  const loadButton = () => {
    if (isFixedPositions) {
      return;
    }
    return (
    <TableCell align="center">
        <Button variant="contained" onClick={handleClick} sx={{
          paddingTop: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(4),
          paddingRight: (theme) => theme.spacing(4),
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
          backgroundColor: `secondary.darken040`,
          borderRadius: 2
        }}>
          FIX RATE
        </Button>
    </TableCell>
    
    );
  }

  const renderTable = () => {
    if (result == 0 || !result || loading) {
      return <></>;
    }
    const button = loadButton(); 
    return (
      // todo: <TableRow key={index} sx={{...anotherObject,  ...typeStyleOverrides() }}>
      <TableRow key={index} sx={{...typeStyleOverrides() }}>
      {(isFixedPositions ? labelsFixed : labelsVariable).map(([field, lable]) => {
        if (field === 'variableApy') {
          return <BorrowVariableAPY />;
        }
        if (field === 'fixedApr') {
          return <BorrowFixedAPR />;
        }
        if (field === 'protocol') {
          // modify to show svgs
          return <Pool underlying={datum.protocol}/>;
        }
        if (field === 'maturity') {
          return <BorrowMaturity/>;
        }
        return <Debt isFixedPositions={isFixedPositions}/>;

      })}
      {button}
      </TableRow> 
  );
  }

  return renderTable();

  
};

export default BorrowTableRow;
