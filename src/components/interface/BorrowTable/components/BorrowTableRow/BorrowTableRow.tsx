import React, { useEffect }  from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { SystemStyleObject, Theme } from '@mui/system';
import isNull from 'lodash/isNull';
import { DateTime } from 'luxon';

import { Button } from '@components/atomic';
import { useWallet } from '@hooks';
import { BorrowAMMTableDatum, labelsVariable, labelsFixed } from '../../types';
import { BorrowVariableAPY, BorrowFixedAPR, Debt, BorrowMaturity } from './components';
import { useBorrowAMMContext, usePositionContext, Agents } from '@contexts';
import { PoolField } from '@components/composite';
import { isNumber } from 'lodash';

export type BorrowTableRowProps = {
  datum: BorrowAMMTableDatum;
  index: number;
  isFixedPositions: boolean;
  onSelect: () => void;
  handleLoadedRow: () => void;
  gaButtonId?: string; 
};


// todo: panel component, adjust the styling
const BorrowTableRow: React.FunctionComponent<BorrowTableRowProps> = ({ datum, index, onSelect, isFixedPositions, handleLoadedRow, gaButtonId }) => {
  const wallet = useWallet();
  const variant = 'main';
  const { variableDebtInNativeTokens: variableDebtInToken, fixedDebtInNativeTokens: fixedDebtInToken, variableDebtInUSD: variableDebt, fixedDebtInUSD: fixedDebt } = useBorrowAMMContext();
  const { position } = usePositionContext();
  const { result: resultVar, loading: loadingVar, call: callVar } = variableDebt;
  const { result: resultFixed, loading: loadingFixed, call: callFixed } = fixedDebt;
  const { result: resultVarInToken, loading: loadingVarInToken, call: callVarInToken } = variableDebtInToken;
  const { result: resultFixedInToken, loading: loadingFixedInToken, call: callFixedInToken } = fixedDebtInToken;

  const { variableApy, fixedApr } = useBorrowAMMContext();
  const { result: resultFixedApr, loading : loadingFixedApr, call: callFixedApr } = fixedApr;
  const { result: resultVarApy, loading: loadingVarApy, call: callVarApy } = variableApy;
  
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

  useEffect(() => {
    if (wallet.status === "connected" && !isFixedPositions) {
      callVarInToken(position);
    }
  }, [callVarInToken, position, wallet.status]);

  useEffect(() => {
    if (wallet.status === "connected" && isFixedPositions) {
      callFixedInToken(position);
    }
  }, [callFixedInToken, position, wallet.status]);

  useEffect(() => {
    if (wallet.status === "connected" && !isFixedPositions) {
      callVarApy();
    }
  }, [callVarApy]);

  useEffect(() => {
    if (wallet.status === "connected" && isFixedPositions) {
      callFixedApr(position);
    }
  }, [callFixedApr, position, wallet.status]);

  useEffect(() => {
    const loadedVar = isFixedPositions ? true : (!loadingVarApy && !loadingVar && !loadingVarInToken && (resultVar || resultVar == 0) && resultVarApy && (resultVarInToken || resultVarInToken == 0) );
    const loadedFixed = !isFixedPositions ? true : (!loadingFixedApr && !loadingFixed && !loadingFixedInToken && resultFixed  && resultFixedApr && resultFixedInToken);
    if (wallet.status === "connected" && loadedVar && loadedFixed) {
      handleLoadedRow();
    }
  }, [loadingVar, loadingVarApy , loadingVarInToken, loadingFixed, loadingFixedApr, loadingFixedInToken]);

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
        <Button onClick={handleClick} 
        id={gaButtonId}
        sx={{
          backgroundColor: '#19152B',
          color: 'primary.light',
          '&:hover': {
            backgroundColor: '#19152B',
            borderStyle: 'none none solid none',
            borderColor: 'primary.light',
            borderRadius: '0px'
          },
          padding: '4px 1px',
          fontSize: 18,
          lineHeight: 1,
          boxShadow: 'none',
          borderStyle: 'none none none none',
          borderRadius: '0px'
        }}>
          FIX RATE
        </Button>
    </TableCell>
    
    );
  }

  const renderTable = () => {
    if (
      (isFixedPositions) ||
      (!isFixedPositions && resultVar && resultVar > 0 && !loadingVar)
      ) {
        const button = loadButton(); 
        return (
          // todo: <TableRow key={index} sx={{...anotherObject,  ...typeStyleOverrides() }}>
          <TableRow key={index} sx={{...typeStyleOverrides() }}>
          {(isFixedPositions ? labelsFixed : labelsVariable).map(([field, lable]) => {
            if (field === 'variableApy') {
              return <BorrowVariableAPY loading={loadingVarApy} variableApy={resultVarApy}/>;
            }
            if (field === 'fixedApr') {
              return <BorrowFixedAPR loading={loadingFixedApr} fixedApr={resultFixedApr}/>;
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
            return <Debt 
              debtInUSD={isFixedPositions ? resultFixed : resultVar}
              loadingDebt={isFixedPositions ? (loadingFixed || loadingFixedInToken): (loadingVar || loadingVarInToken)}
              debtInToken={isFixedPositions ? resultFixedInToken : resultVarInToken}
              tokenName={datum.underlyingTokenName} />;
    
          })}
          {button}
          </TableRow> );
    }
    
  }

  return <>{renderTable()}</>;

  
};

export default BorrowTableRow;
