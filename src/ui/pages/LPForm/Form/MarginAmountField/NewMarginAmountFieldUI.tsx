import { TokenField, TokenFieldProps, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  selectInfoPostLp,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectUserInputMarginInfo,
  selectWalletBalance,
  LpFormNumberLimits,
} from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
import { formatNumber } from '../../../../../utilities/number';
import { MarginAmountFieldBox } from './MarginAmountField.styled';

type NewMarginAmountFieldUIProps = {
  handleOnMarginChange: (value?: string) => void;
  localMargin: string | null;
  underlyingTokenName: string;
  labelTypographyToken: TypographyToken;
  bottomLeftTextTypographyToken: TypographyToken;
  bottomRightTextTypographyToken: TypographyToken;
  topRightTextTypographyToken: TypographyToken;
};

export const NewMarginAmountFieldUI: React.FunctionComponent<NewMarginAmountFieldUIProps> = ({
  handleOnMarginChange,
  localMargin,
  underlyingTokenName,
  labelTypographyToken,
  bottomRightTextTypographyToken,
  bottomLeftTextTypographyToken,
  topRightTextTypographyToken,
}) => {
  const isMarginRequiredError = useAppSelector(selectIsMarginRequiredError);
  const isWalletMarginError = useAppSelector(selectIsWalletMarginError);
  const marginAmount = useAppSelector(selectUserInputMarginInfo);
  const infoPostLp = useAppSelector(selectInfoPostLp);
  const walletBalance = useAppSelector(selectWalletBalance);

  return (
    <MarginAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={
          isMarginRequiredError ? (marginAmount.error as string) : 'Minimum Margin Required'
        }
        bottomLeftTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
        bottomRightTextColorToken={isMarginRequiredError ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken={bottomRightTextTypographyToken}
        bottomRightTextValue={
          infoPostLp.status === 'success'
            ? formatNumber(infoPostLp.value.marginRequirement)
            : '--'
        }
        decimalsLimit={LpFormNumberLimits.decimalLimit}
        error={isMarginRequiredError || isWalletMarginError}
        label="Chosen Margin"
        labelTypographyToken={labelTypographyToken}
        maxLength={LpFormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every position to have enough margin to support trades. Adding more than the minimum reduces liquidation risk."
        topRightText={`Wallet: ${`${walletBalance} ${underlyingTokenName.toUpperCase()}`}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken={topRightTextTypographyToken}
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnMarginChange}
      />
    </MarginAmountFieldBox>
  );
};
