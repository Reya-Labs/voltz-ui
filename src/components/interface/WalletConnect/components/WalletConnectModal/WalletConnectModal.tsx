import React, { useState, useEffect } from 'react';

import { Panel, Wallet, WalletName } from '@components/atomic';
import { Modal } from '@components/composite';
import { WalletConnectButton, WalletDisplay, WalletSelect } from './components';

export type WalletConnectModalProps = {
  wallet: Wallet;
};

const WalletConnectModal: React.FunctionComponent<WalletConnectModalProps> = ({ wallet }) => {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState(true);
  const handleChangeWallet = () => setSelecting(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelecting(false);
    setOpen(false);
  };
  const handleSelectWallet = (walletName: WalletName) => {
    handleClose();

    if (wallet.name !== walletName) {
      wallet.connect(walletName);
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
          padding: (theme) => theme.spacing(6),
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
