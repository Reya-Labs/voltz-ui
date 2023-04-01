import { TokenField, TokenFieldProps, TypographyToken } from 'brokoli-ui';
import React from 'react';

import {
  LpFormNumberLimits,
  selectIsMarginRequiredError,
  selectIsWalletMarginError,
  selectMarginRequirementFormatted,
  selectUserInputMarginInfo,
  selectWalletBalance,
} from '../../../../../app/features/lp-form';
import { useAppSelector } from '../../../../../app/hooks';
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
  const walletBalance = useAppSelector(selectWalletBalance);
  const marginRequirementFormatted = useAppSelector(selectMarginRequirementFormatted);

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
        bottomRightTextValue={marginRequirementFormatted}
        decimalsLimit={LpFormNumberLimits.decimalLimit}
        error={isMarginRequiredError || isWalletMarginError}
        label="Chosen Margin"
        labelTypographyToken={labelTypographyToken}
        maxLength={LpFormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="The protocol requires every LP position to have enough margin to support trades against their liquidity. Adding more than the minimum reduces liquidation risk."
        topRightText={`Wallet: ${`${walletBalance} ${underlyingTokenName.toUpperCase()}`}`}
        topRightTextColorToken={isWalletMarginError ? 'wildStrawberry' : 'lavenderWeb2'}
        topRightTextTypographyToken={topRightTextTypographyToken}
        value={localMargin !== null ? localMargin : undefined}
        onChange={handleOnMarginChange}
      />
    </MarginAmountFieldBox>
  );
};
