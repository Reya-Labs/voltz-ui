import { Box } from '@mui/system';
import LPMellowVaultDepositInfo from './components/LPMellowVaultDepositInfo';
import LPMellowVaultDepositWindow from './components/LPMellowVaultDepositWindow';
import MellowLpDepositFormHeader from './components/MellowLpDepositFormHeader';
import React from 'react';

import { MellowProduct } from '../types';
import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type MellowLpDepositFormProps = {
  lpVault: MellowProduct;
  onChangeDeposit: (value: number | undefined) => void;
  submitText: string;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  onSubmit: () => void;
  disabled: boolean;
  onCancel: () => void;
};

const MellowLpDepositForm: React.FunctionComponent<MellowLpDepositFormProps> = ({
  lpVault,
  onChangeDeposit,
  submitText,
  hintText,
  disabled,
  onSubmit,
  onCancel,
}: MellowLpDepositFormProps) => {
  return (
    <>
      <MellowLpDepositFormHeader onCancel={onCancel} />
      <Box sx={{ display: 'flex' }}>
        <LPMellowVaultDepositInfo
          vaultCap={lpVault.vault.vaultCap}
          vaultCumulative={lpVault.vault.vaultCumulative}
          tokenName={lpVault.metadata.token}
          protocol={lpVault.vault instanceof MellowLpVault ? lpVault.vault.protocol : undefined}
          expectedApy={lpVault.metadata.estimatedHistoricApy}
          maturity={lpVault.metadata.maturity}
          userDeposit={lpVault.vault.userDeposit}
        />

        <LPMellowVaultDepositWindow
          userWalletBalance={lpVault.vault.userWalletBalance}
          tokenName={lpVault.metadata.token}
          onChangeDeposit={onChangeDeposit}
          submitText={submitText}
          hintText={hintText}
          disabled={disabled}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
};

export default MellowLpDepositForm;
