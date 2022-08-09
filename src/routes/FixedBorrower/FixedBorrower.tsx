import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk';

import { setPageTitle, findCurrentPosition, fromAMMtoBorrowAMM } from '@utilities';
import { Agents } from '@contexts';
import { useAgent, useAMMs, usePositions } from '@hooks';

import { Page } from '@components/interface';
import ConnectedBorrowForm from 'src/components/containers/ConnectedBorrowForm/ConnectedBorrowForm';
import ConnectedBorrowPositionTable from 'src/components/containers/ConnectedBorrowPositionTable/ConnectedBorrowPositionTable';
import { getRenderMode } from './services';
import AugmentedAMM from 'src/utilities/augmentedAmm';

const FixedBorrower: React.FunctionComponent = () => {
  const [isForm, setIsForm] = useState<boolean>();
  const [amm, setAMM] = useState<AugmentedAMM>();
  const [position, setPosition] = useState<Position>();

  const { positions } = usePositions();
  const { amms } = useAMMs();

  const renderMode = getRenderMode(isForm);

  const handleSelectAmm = (selectedAMM: AugmentedAMM) => {
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [2])); // VT positions
  };

  const handleSelectPosition = (selectedPosition: Position) => {
    setAMM(selectedPosition.amm as AugmentedAMM);
    setPosition(selectedPosition);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    switch(renderMode) {
      case 'fix-borrow': {
        setPageTitle('Fixed Borrow Form');
        break;
      }
      case 'borrow-positions': {
        setPageTitle('Borrwer Portfolio');
        break;
      }
    }
  }, [setPageTitle, renderMode, position]);

  const handleReset = () => {
    setAMM(undefined);
    setPosition(undefined);
  };

  return (
    <Page backgroundView='none'>
        {renderMode === 'fix-borrow' && (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
            <ConnectedBorrowForm onReset={handleReset} />
          </Box>
      )}

        {renderMode === 'borrow-positions' && (
          <ConnectedBorrowPositionTable 
            amm={amm}
            onSelectItem={handleSelectPosition}
            agent={Agents.VARIABLE_TRADER}
          />
      )}
    </Page>
  );
};

export default FixedBorrower;
