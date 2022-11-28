import { IconLabel } from '../../../components/composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../../components/composite/InputTokenLabel/InputTokenLabel';
import { MaskedIntegerField } from '../../../components/composite/MaskedIntegerField/MaskedIntegerField';

import Box from '@mui/material/Box';
import { formatCurrency, toUSFormat } from '../../../utilities/number';
import { Typography } from '../../../components/atomic/Typography/Typography';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { Button } from '../../../components/atomic/Button/Button';
import { colors } from '../../../theme';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { MellowProduct } from '../types';
import { LPMellowVaultDepositInfo } from './components/LPMellowVaultDepositInfo';
import { Agents } from '../../../contexts/AgentContext/types';
import { FormPanel } from '../../../components/interface/FormPanel/FormPanel';

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
        marginLeft: 'auto',
        marginRight: 'auto',
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

      <Box
        sx={{
          display: 'flex',
          marginTop: (theme) => theme.spacing(4),
          justifyContent: 'space-between',
          columnGap: (theme) => theme.spacing(6),
        }}
      >
        <Button
          disabled={disabled}
          onClick={onSubmit}
          size="medium"
          agent={Agents.LIQUIDITY_PROVIDER}
          sx={{
            padding: '16px',
            background: colors.skyBlueCrayola.darken030,
            color: colors.skyBlueCrayola.base,
            flex: 1,
          }}
        >
          {submitText}
        </Button>
        <Button
          onClick={onCancel}
          size="medium"
          variant="dark"
          sx={{
            color: colors.skyBlueCrayola.base,
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
          'Deposits are transferred to pools once a day, at 7pm UTC, to reduce gas costs, and will be locked into the pool until the pool reaches maturity. At this point the withdrawal mechanism will be enabled.',
          'Remember, returns are not guaranteed and you may get back less than you put in.',
        ].map((item) => (
          <Typography
            key={item}
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
      {suffixText ? ` ${suffixText}` : null}
    </Typography>
  );
};

export default MellowLpDepositForm;
