import { FormPanel } from '@components/interface';
import { IconLabel, InputTokenLabel, MaskedIntegerField } from '@components/composite';
import { Box } from '@mui/system';
import { formatCurrency, toUSFormat } from '@utilities';
import { Panel, Typography, Button } from '@components/atomic';
import { colors } from '@theme';
import { isUndefined } from 'lodash';
import React from 'react';

export type LPMellowVaultDepositWindowProps = {
  userWalletBalance?: number;
  tokenName: string;
  onChangeDeposit: (value: number | undefined) => void;
  submitText: string;
  hintText: {
    text: string;
    suffixText?: string;
    textColor?: string;
  };
  onSubmit: () => void;
  disabled: boolean;
};

const LPMellowVaultDepositWindow: React.FunctionComponent<LPMellowVaultDepositWindowProps> = ({
  userWalletBalance,
  tokenName,
  onChangeDeposit,
  submitText,
  hintText,
  disabled,
  onSubmit,
}: LPMellowVaultDepositWindowProps) => {
  const subtext = `WALLET BALANCE: ${
    isUndefined(userWalletBalance)
      ? '---'
      : `${formatCurrency(userWalletBalance, true)} ${tokenName}`
  }`;

  const handleChange = (newValue: string | undefined) => {
    const usFormatted = toUSFormat(newValue);
    onChangeDeposit(!isUndefined(usFormatted) ? parseFloat(usFormatted) : undefined);
  };

  return (
    <FormPanel
      sx={{
        width: '100%',
        maxWidth: '328px',
        maxHeight: '464px',
        background: '#19152A',
        padding: (theme) => theme.spacing(4),
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ borderBottom: '1px solid #E5E1F9' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '24px',
              lineHeight: '1.2',
              color: '#E5E1F9',
              fontWeight: '700',
              marginLeft: '0px',
            }}
          >
            DEPOSIT
          </Typography>
        </Box>

        {/* TODO enable WITHDRAW once feature is supported (maturity) */}
        {/* <Box sx={{ borderBottom: '1px solid #2A2444', marginLeft: '16px' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '24px',
              lineHeight: '1.2',
              color: '#2A2444',
              fontWeight: '700',
              marginLeft: '0px',
            }}
          >
            WITHDRAW
          </Typography>
        </Box> */}
      </Box>

      <Typography
        variant="body1"
        sx={{
          fontFamily: 'DM Sans',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#e5e1f9d9',
          marginTop: (theme) => theme.spacing(4),
          fontWeight: '400',
        }}
      >
        The Mellow LP Optimiser is available for the Voltz Protocol stETH pool.
      </Typography>

      <Box sx={{ marginTop: '16px' }}>
        <MaskedIntegerField
          allowDecimals
          allowNegativeValue={false}
          suffix={<InputTokenLabel tokenName={tokenName} />}
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
          size="large"
          sx={{
            flexGrow: 1,
            backgroundColor: '#00556D',
            color: '#4DE5FF',
            '&:hover': {
              backgroundColor: '#00556D',
              borderColor: '#4DE5FF',
              boxShadow: '0px 4px 20px 0px #4de5ff33',
            },
          }}
        >
          {submitText}
        </Button>
      </Box>

      <HintText {...hintText} />

      <Panel
        sx={{
          width: '100%',
          maxWidth: '296px',
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
          Funds deposited will be locked into the pool until the pool reaches maturity. Upon
          maturity, the withdrawal mechanism will be enabled.
        </Typography>
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

export default LPMellowVaultDepositWindow;
