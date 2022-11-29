import React, { useEffect, useState } from 'react';

import { WalletName } from '../../../../../contexts/WalletContext/types';
import { useWallet } from '../../../../../hooks/useWallet';
import { Panel } from '../../../../atomic/Panel/Panel';
import { Modal } from '../../../../composite/Modal/Modal';
import { WalletConnectButton, WalletDisplay, WalletSelect } from './components';

export const WalletConnectModal: React.FunctionComponent = () => {
  const wallet = useWallet();
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState(true);
  const handleChangeWallet = () => setSelecting(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelecting(false);
    setOpen(false);
    wallet.setRequired(false);
  };
  const handleSelectWallet = (name: WalletName) => {
    handleClose();
    if (name === 'disconnect') {
      wallet.disconnect();
    } else {
      void wallet.connect(name);
    }
  };

  const renderContent = () => {
    if (wallet.status === 'connected' && !selecting) {
      return <WalletDisplay wallet={wallet} onChangeWallet={handleChangeWallet} />;
    }

    return <WalletSelect wallet={wallet} onSelectWallet={handleSelectWallet} />;
  };

  useEffect(() => {
    if (wallet.status === 'connected') {
      setSelecting(false);
    }
  }, [wallet.status]);

  useEffect(() => {
    if (wallet.required) {
      setOpen(true);
      setSelecting(true);
    }
  }, [wallet.required]);

  return (
    <Modal
      open={open}
      trigger={<WalletConnectButton wallet={wallet} />}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <Panel
        sx={{
          minWidth: 400,
          maxWidth: 400,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
        }}
        variant="darker"
      >
        {renderContent()}
      </Panel>
    </Modal>
  );
};
