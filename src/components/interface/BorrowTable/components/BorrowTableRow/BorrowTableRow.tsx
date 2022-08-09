import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Agents } from '@contexts';
import { Button } from '@components/atomic';
import { PoolField } from '@components/composite';
import { useWallet } from '@hooks';
import { BorrowAMMTableDatum, labelsVariable } from '../../types';
import { BorrowVariableAPY, Debt } from './components';

export type BorrowTableRowProps = {
  datum: BorrowAMMTableDatum;
  index: number;
  onSelect: () => void;
};


// todo: panel component, adjust the styling
const BorrowTableRow: React.FunctionComponent<BorrowTableRowProps> = ({ datum, index, onSelect }) => {
  const wallet = useWallet();
  const variant = 'main';
  
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

  return (
      // todo: <TableRow key={index} sx={{...anotherObject,  ...typeStyleOverrides() }}>
      <TableRow key={index} sx={{...typeStyleOverrides() }}>
      {labelsVariable.map(([field, lable]) => {
        if (field === 'variableApy') {
          return <BorrowVariableAPY />;
        }
        if (field === 'protocol') {
          return (
            <TableCell key={field}>
              <PoolField agent={Agents.VARIABLE_TRADER} protocol={datum.protocol} isBorrowing={false} capLoading={false} cap={0}/>
            </TableCell>
            );
        }

        return <Debt />;

      })}
      <TableCell align="center">
        <Button variant="contained" onClick={handleClick} sx={{
          paddingTop: (theme) => theme.spacing(3),
          paddingBottom: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(4),
          paddingRight: (theme) => theme.spacing(4),
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
        }}>
          FIX RATE
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BorrowTableRow;
