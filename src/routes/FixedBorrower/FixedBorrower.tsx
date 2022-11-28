import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useWallet } from '../../hooks/useWallet';

import { ConnectedBorrowForm } from '../../components/containers/ConnectedBorrowForm/ConnectedBorrowForm';
import { ConnectedBorrowPositionTable } from '../../components/containers/ConnectedBorrowPositionTable/ConnectedBorrowPositionTable';
import { getRenderMode } from './services';

import { Position, AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';
import { BorrowAMMProvider } from '../../contexts/BorrowAMMContext/BorrowAMMContext';
import { PositionProvider } from '../../contexts/PositionContext/PositionContext';
import { AMMProvider } from '../../contexts/AMMContext/AMMContext';
import { Agents } from '../../contexts/AgentContext/types';
import { BorrowFormProvider } from '../../contexts/BorrowFormContext/BorrowFormContext';
import { useBorrowPositions } from '../../hooks/useBorrowPositions';
import { setPageTitle } from 'src/utilities/page';
import { findCurrentBorrowPosition } from '../../utilities/borrowAmm';

export const FixedBorrower: React.FunctionComponent = () => {
  const [isForm, setIsForm] = useState<boolean>();
  const [borrowAmm, setBorrowAMM] = useState<BorrowAMM>();
  const [position, setPosition] = useState<Position>();

  const { positions } = useBorrowPositions();
  const { account } = useWallet();

  const renderMode = getRenderMode(isForm);

  const handleSelectBorrowAMM = (selectedBorrowAMM: BorrowAMM) => {
    setIsForm(true);
    setBorrowAMM(selectedBorrowAMM);
    setPosition(findCurrentBorrowPosition(positions || [], selectedBorrowAMM.id));
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    setBorrowAMM(undefined);
    setPosition(undefined);
    // onChangeAgent(Agents.BORROW_TRADER);
  }, [setBorrowAMM, setPosition]);

  useEffect(() => {
    switch (renderMode) {
      case 'fix-borrow': {
        setPageTitle('Fixed Borrow Form', account);
        break;
      }
      case 'borrow-positions': {
        setPageTitle('Borrower Portfolio', account);
        break;
      }
    }
  }, [setPageTitle, renderMode, position]);

  const handleReset = () => {
    setBorrowAMM(undefined);
    setPosition(undefined);
    setIsForm(false);
  };

  return (
    <>
      {renderMode === 'fix-borrow' && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          {borrowAmm && borrowAmm.amm && (
            <BorrowAMMProvider amm={borrowAmm}>
              <AMMProvider amm={new AMM(borrowAmm.amm)}>
                <PositionProvider position={position}>
                  <BorrowFormProvider>
                    <ConnectedBorrowForm onReset={handleReset} />
                  </BorrowFormProvider>
                </PositionProvider>
              </AMMProvider>
            </BorrowAMMProvider>
          )}
        </Box>
      )}

      {renderMode === 'borrow-positions' && (
        <Box sx={{ backdropFilter: 'blur(8px)', height: '100%', paddingBottom: '200px' }}>
          <ConnectedBorrowPositionTable
            onSelectItem={handleSelectBorrowAMM}
            agent={Agents.VARIABLE_TRADER}
          />
        </Box>
      )}
    </>
  );
};
