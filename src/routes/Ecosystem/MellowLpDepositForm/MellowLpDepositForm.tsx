import Box from '@mui/material/Box';
import isUndefined from 'lodash/isUndefined';
import React from 'react';

import { Button } from '../../../components/atomic/Button/Button';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { Typography } from '../../../components/atomic/Typography/Typography';
import { IconLabel } from '../../../components/composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../../components/composite/InputTokenLabel/InputTokenLabel';
import { MaskedIntegerField } from '../../../components/composite/MaskedIntegerField/MaskedIntegerField';
import { FormPanel } from '../../../components/interface/FormPanel/FormPanel';
import { Agents } from '../../../contexts/AgentContext/types';
import { colors } from '../../../theme';
import { formatCurrency, toUSFormat } from '../../../utilities/number';
import { MellowProduct } from '../types';
import { LPMellowVaultDepositInfo } from './components/LPMellowVaultDepositInfo';

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
          allowNegativeValue={false}
          defaultValue={0}
          label={
            <IconLabel
              icon="information-circle"
              info={
                'Choose the amount you wish to deposit into the strategy. Remember you won’t be able to withdraw until the pool matures. '
              }
              label={'AMOUNT'}
            />
          }
          subtext={subtext}
          subtextSize={12}
          suffix={<InputTokenLabel tokenName={lpVault.metadata.token} />}
          suffixPadding={90}
          allowDecimals
          onChange={handleChange}
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
          agent={Agents.LIQUIDITY_PROVIDER}
          disabled={disabled}
          size="medium"
          sx={{
            padding: '16px',
            background: colors.skyBlueCrayola.darken030,
            color: colors.skyBlueCrayola.base,
            flex: 1,
          }}
          onClick={onSubmit}
        >
          {submitText}
        </Button>
        <Button
          size="medium"
          sx={{
            color: colors.skyBlueCrayola.base,
          }}
          variant="dark"
          onClick={onCancel}
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
          sx={{
            fontSize: '14px',
            color: '#C6C2DA',
            fontWeight: '700',
            marginLeft: '0px',
            lineHeight: '120%',
          }}
          variant="h1"
        >
          ABOUT YOUR FUNDS
        </Typography>

        {[
          'Deposits are transferred to pools once a day, at 7pm UTC, to reduce gas costs, and will be locked into the pool until the pool reaches maturity. At this point the withdrawal mechanism will be enabled.',
          'Remember, returns are not guaranteed and you may get back less than you put in.',
        ].map((item) => (
          <Typography
            key={item}
            sx={{
              fontSize: '12px',
              color: '#9B97AD',
              marginTop: (theme) => theme.spacing(2.5),
              fontWeight: '400',
              lineHeight: '1.5',
            }}
            variant="body1"
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
      sx={{
        marginTop: (theme) => theme.spacing(2),
        color: colors.lavenderWeb.darken015,
        fontSize: '12px',
      }}
      variant="body2"
    >
      <span style={{ color: textColor }}> {text}</span>
      {suffixText ? ` ${suffixText}` : null}
    </Typography>
  );
};

export default MellowLpDepositForm;
