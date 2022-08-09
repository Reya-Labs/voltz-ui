import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Position } from '@voltz-protocol/v1-sdk';

import { setPageTitle, findCurrentBorrowPosition, fromAMMtoBorrowAMM } from '@utilities';
import { Agents } from '@contexts';
import { useAgent, useAMMs, usePositions } from '@hooks';

import { Page } from '@components/interface';
import ConnectedBorrowForm from 'src/components/containers/ConnectedBorrowForm/ConnectedBorrowForm';
import ConnectedBorrowPositionTable from 'src/components/containers/ConnectedBorrowPositionTable/ConnectedBorrowPositionTable';
import { getRenderMode } from './services';
import AugmentedBorrowAMM from 'src/utilities/augmentedBorrowAmm';

const FixedBorrower: React.FunctionComponent = () => {
  const [isForm, setIsForm] = useState<boolean>();
  const [borrowAmm, setBorrowAMM] = useState<AugmentedBorrowAMM>();
  const [position, setPosition] = useState<Position>();

  const { positions } = usePositions();
  const { amms } = useAMMs();

  const renderMode = getRenderMode(isForm);

  /*const handleSelectAmm = (selectedAMM: AugmentedAMM) => {
    setAMM(selectedAMM);
    setPosition(findCurrentPosition(positions || [], selectedAMM, [2])); // VT positions
  };*/

  const handleSelectBorrowAMM = (selectedBorrowAMM: AugmentedBorrowAMM) => {
    setIsForm(true);
    setBorrowAMM(selectedBorrowAMM);
    setPosition(findCurrentBorrowPosition(positions || [], selectedBorrowAMM))
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
    setBorrowAMM(undefined);
    setPosition(undefined);
    setIsForm(false);
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
            onSelectItem={handleSelectBorrowAMM}
            agent={Agents.VARIABLE_TRADER}
          />
      )}
    </Page>
  );
};

export default FixedBorrower;
