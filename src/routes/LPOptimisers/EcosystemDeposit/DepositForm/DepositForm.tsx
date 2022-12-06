import isUndefined from 'lodash.isundefined';
import React from 'react';

import { Ellipsis } from '../../../../components/atomic/Ellipsis/Ellipsis';
import { IconLabel } from '../../../../components/composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../../../components/composite/InputTokenLabel/InputTokenLabel';
import { MellowProduct } from '../../../../store/features/ecosystem/getMellowLPVaults/config';
import { formatCurrency, toUSFormat } from '../../../../utilities/number';
import { DepositButton } from '../DepositButton/DepositButton';
import {
  BackButton,
  ButtonBox,
  DescriptionBodyTypography,
  DescriptionBox,
  DescriptionTitleTypography,
  FormBox,
  FullButtonBox,
  HintTextTypography,
  MaskedIntegerFieldStyled,
  PrefixHintTextSpan,
} from './DepositForm.styled';
import { DepositInfo } from './DepositInfo/DepositInfo';
import {
  MaturityDistribution,
  MaturityDistributionProps,
} from './MaturityDistribution/MaturityDistribution';

export type DepositFormProps = {
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
  loading: boolean;
  success: boolean;
  onCancel: () => void;
  weights: MaturityDistributionProps['weights'];
  distribution: MaturityDistributionProps['distribution'];
  onChangeDistribution: MaturityDistributionProps['onChangeDistribution'];
};

export const DepositForm: React.FunctionComponent<DepositFormProps> = ({
  lpVault,
  onChangeDeposit,
  submitText,
  hintText,
  disabled,
  onSubmit,
  onCancel,
  loading,
  success,
  weights,
  distribution,
  onChangeDistribution,
}: DepositFormProps) => {
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
    <FormBox>
      <DepositInfo mellowProduct={lpVault} />
      <MaturityDistribution
        distribution={distribution}
        weights={weights}
        onChangeDistribution={onChangeDistribution}
      />
      <MaskedIntegerFieldStyled
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

      <FullButtonBox>
        <ButtonBox>
          <DepositButton disabled={disabled} loading={loading} success={success} onClick={onSubmit}>
            {submitText}
          </DepositButton>
          <BackButton onClick={onCancel}>BACK</BackButton>
        </ButtonBox>

        <HintText {...hintText} loading={loading} />
      </FullButtonBox>

      <DescriptionBox>
        <DescriptionTitleTypography>ABOUT YOUR FUNDS</DescriptionTitleTypography>
        {[
          'Deposits are transferred to pools once a day, at 7pm UTC, to reduce gas costs, and will be locked into the pool until the pool reaches maturity. At this point the withdrawal mechanism will be enabled.',
          'Remember, returns are not guaranteed and you may get back less than you put in.',
        ].map((item) => (
          <DescriptionBodyTypography key={item}>{item}</DescriptionBodyTypography>
        ))}
      </DescriptionBox>
    </FormBox>
  );
};

const HintText: React.FunctionComponent<{
  text: string;
  suffixText?: string;
  textColor?: string;
  loading: boolean;
}> = ({ loading, text, suffixText, textColor }) => {
  return (
    <HintTextTypography>
      <PrefixHintTextSpan color={textColor}>
        {text}
        {loading ? <Ellipsis /> : null}
      </PrefixHintTextSpan>
      {suffixText ? ` ${suffixText}` : null}
    </HintTextTypography>
  );
};
