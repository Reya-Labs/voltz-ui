import Box from '@mui/material/Box';
import { AMM, BorrowAMM, Position } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { ConnectedBorrowForm } from '../../components/containers/ConnectedBorrowForm/ConnectedBorrowForm';
import { Agents } from '../../contexts/AgentContext/types';
import { AMMProvider } from '../../contexts/AMMContext/AMMContext';
import { BorrowAMMProvider } from '../../contexts/BorrowAMMContext/BorrowAMMContext';
import { BorrowFormProvider } from '../../contexts/BorrowFormContext/BorrowFormContext';
import { PositionProvider } from '../../contexts/PositionContext/PositionContext';
import { useAgent } from '../../hooks/useAgent';
import { usePositions } from '../../hooks/usePositions/usePositions';
import { useWallet } from '../../hooks/useWallet';
import { findCurrentBorrowPosition } from '../../utilities/borrowAmm';
import { setPageTitle } from '../../utilities/page';
import { ConnectedBorrowPositionTable } from './ConnectedBorrowPositionTable/ConnectedBorrowPositionTable';
import { getRenderMode } from './services';

export const FixedBorrower: React.FunctionComponent = () => {
  const [isForm, setIsForm] = useState<boolean>();
  const [borrowAmm, setBorrowAMM] = useState<BorrowAMM>();
  const [position, setPosition] = useState<Position>();
  const { onChangeAgent } = useAgent();

  const { borrowPositions, loading: loadingPositions, error: errorPositions } = usePositions(Agents.VARIABLE_TRADER);
  const { account } = useWallet();

  const renderMode = getRenderMode(isForm);

  const handleSelectBorrowAMM = (selectedBorrowAMM: BorrowAMM) => {
    setIsForm(true);
    setBorrowAMM(selectedBorrowAMM);
    setPosition(findCurrentBorrowPosition(borrowPositions, selectedBorrowAMM.id));
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    setBorrowAMM(undefined);
    setPosition(undefined);
    onChangeAgent(Agents.VARIABLE_TRADER);
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
            agent={Agents.VARIABLE_TRADER}
            borrowPositions={borrowPositions}
            errorPositions={errorPositions}
            loadingPositions={loadingPositions}
            onSelectItem={handleSelectBorrowAMM}
          />
        </Box>
      )}
    </>
  );
};
