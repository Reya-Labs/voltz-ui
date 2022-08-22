import React, { useEffect }  from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';

import { Button } from '@components/atomic';
import { useWallet } from '@hooks';
import { BorrowAMMTableDatum, labelsVariable, labelsFixed } from '../../types';
import { BorrowVariableAPY, BorrowFixedAPR, Debt, BorrowMaturity } from './components';
import { useBorrowAMMContext, usePositionContext, Agents } from '@contexts';
import { PoolField } from '@components/composite';

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
  const { variableDebtInUSD: variableDebt, fixedDebtInUSD: fixedDebt } = useBorrowAMMContext();
  const { position } = usePositionContext();
  const { result: resultVar, loading: loadingVar, call: callVar } = variableDebt;
  const { result: resultFixed, loading: loadingFixed, call: callFixed } = fixedDebt;

  useEffect(() => {
    if (wallet.status === "connected" && !isFixedPositions) {
      callVar(position);
    }
  }, [callVar, position, wallet.status]);

  useEffect(() => {
    if (wallet.status === "connected" && isFixedPositions) {
      callFixed(position);
    }
  }, [callFixed, position, wallet.status]);

  const typeStyleOverrides = (): SystemStyleObject<Theme> => {
    if (!variant) {
      return {
        backgroundColor: `primary.dark`,
      };
    }
    if (variant == 'main') {
      return {
        backgroundColor: `#19152B`, // this affects the colour of the Pool table rows
        borderRadius: '8px'
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
    <TableCell align="left" width="20%">
        <Button variant="contained" agent={Agents.LIQUIDITY_PROVIDER} onClick={handleClick} sx={{
          padding: '8px 16px',
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
          backgroundColor: `#19152B`,
          borderRadius: '4px'
        }}>
          FIX RATE
        </Button>
    </TableCell>
    
    );
  }

  const renderTable = () => {
    if (
      (isFixedPositions && resultFixed && resultFixed > 0 && !loadingFixed) ||
      (!isFixedPositions && resultVar && resultVar > 0 && !loadingVar)
      ) {
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
              return (
              <TableCell key={"protocol"} width="35%" >
                <PoolField protocol={datum.protocol} isBorrowing={false} capLoading={false} cap={null} isBorrowTable={true}/>
              </TableCell>);
            }
            if (field === 'maturity') {
              return <BorrowMaturity/>;
            }
            return <Debt debt={isFixedPositions ? resultFixed : resultVar}/>;
    
          })}
          {button}
          </TableRow> );
    }
    
  }

  return <>{renderTable()}</>;

  
};

export default BorrowTableRow;
