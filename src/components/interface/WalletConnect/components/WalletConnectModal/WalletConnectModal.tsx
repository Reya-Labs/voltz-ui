import React, { useState, useEffect } from 'react';

import { useWallet } from '@hooks';
import { Panel } from '@components/atomic';
import { Modal } from '@components/composite';
import { WalletConnectButton, WalletDisplay, WalletSelect } from './components';
import { WalletName } from '@components/contexts';

const WalletConnectModal: React.FunctionComponent = () => {
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
    wallet.connect(name);
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
      onOpen={handleOpen}
      onClose={handleClose}
      trigger={<WalletConnectButton wallet={wallet} />}
    >
      <Panel
        variant="darker"
        sx={{
          minWidth: 400,
          maxWidth: 400,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderContent()}
      </Panel>
    </Modal>
  );
};

export default WalletConnectModal;
