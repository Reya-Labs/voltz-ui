import { FormPanel } from '@components/interface';
import { IconLabel, InputTokenLabel, MaskedIntegerField } from '@components/composite';
import { Box } from '@mui/system';
import { formatCurrency, toUSFormat } from '@utilities';
import { Panel, Typography, Button } from '@components/atomic';
import { colors } from '@theme';
import { isUndefined } from 'lodash';
import React from 'react';
import { MellowProduct } from '../types';
import LPMellowVaultDepositInfo from './components/LPMellowVaultDepositInfo';

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
  const subtext = `WALLET BALANCE: ${
    isUndefined(lpVault.vault.userWalletBalance)
      ? '---'
      : `${formatCurrency(lpVault.vault.userWalletBalance, true)} ${lpVault.metadata.token}`
  }`;

  const handleChange = (newValue: string | undefined) => {
    const usFormatted = toUSFormat(newValue);
    onChangeDeposit(!isUndefined(usFormatted) ? parseFloat(usFormatted) : undefined);
  };

  return (
    <FormPanel
      sx={{
        width: '100%',
        maxWidth: '398px',
        background: '#19152A',
        padding: (theme) => theme.spacing(4),
      }}
    >
      <LPMellowVaultDepositInfo mellowProduct={lpVault} />
      <Box sx={{ marginTop: '16px' }}>
        <MaskedIntegerField
          allowDecimals
          allowNegativeValue={false}
          suffix={<InputTokenLabel tokenName={lpVault.metadata.token} />}
          suffixPadding={90}
          label={
            <IconLabel
              label={'AMOUNT'}
              icon="information-circle"
              info={
                'Choose the amount you wish to deposit into the strategy. Remember you won’t be able to withdraw until the pool matures. '
              }
            />
          }
          defaultValue={0}
          onChange={handleChange}
          subtext={subtext}
          subtextSize={12}
        />
      </Box>

      <Box sx={{ display: 'flex', marginTop: (theme) => theme.spacing(4) }}>
        <Button
          disabled={disabled}
          onClick={onSubmit}
          size="medium"
          variant="contained"
          sx={{
            width: '256px',
            marginRight: '24px',
          }}
        >
          {submitText}
        </Button>
        <Button
          onClick={onCancel}
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: '#2D2B3D',
          }}
        >
          BACK
        </Button>
      </Box>

      <HintText {...hintText} />

      <Panel
        sx={{
          width: '100%',
          background: '#28233B',
          padding: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(4),
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '14px',
            color: '#C6C2DA',
            fontWeight: '700',
            marginLeft: '0px',
            lineHeight: '120%',
          }}
        >
          ABOUT YOUR FUNDS
        </Typography>

        {[
          'Funds deposited will be locked into the pool until the pool reaches maturity. At this point the withdrawal mechanism will be enabled.',
          'Remember, returns are not guaranteed and you may get back less than you put in.',
        ].map((item) => (
          <Typography
            variant="body1"
            sx={{
              fontSize: '12px',
              color: '#9B97AD',
              marginTop: (theme) => theme.spacing(2.5),
              fontWeight: '400',
              lineHeight: '1.5',
            }}
          >
            {item}
          </Typography>
        ))}
      </Panel>
    </FormPanel>
  );
};

const HintText: React.FunctionComponent<{
  text: string;
  suffixText?: string;
  textColor?: string;
}> = ({ text, suffixText, textColor }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        marginTop: (theme) => theme.spacing(2),
        color: colors.lavenderWeb.darken015,
        fontSize: '12px',
      }}
    >
      <span style={{ color: textColor }}> {text}</span>
      {suffixText}
    </Typography>
  );
};

export default MellowLpDepositForm;
