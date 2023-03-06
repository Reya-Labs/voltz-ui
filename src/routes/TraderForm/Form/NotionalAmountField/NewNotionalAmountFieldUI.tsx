import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React from 'react';

import {
  selectPoolSwapInfo,
  selectProspectiveSwapMode,
  selectUserInputNotionalInfo,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';

type NewNotionalAmountFieldUIProps = {
  handleOnNotionalChange: (value?: string) => void;
  localNotional: string | null;
  underlyingTokenName: string;
};

export const NewNotionalAmountFieldUI: React.FunctionComponent<NewNotionalAmountFieldUIProps> = ({
  handleOnNotionalChange,
  localNotional,
  underlyingTokenName,
}) => {
  const notionalInfo = useAppSelector(selectUserInputNotionalInfo);

  const mode = useAppSelector(selectProspectiveSwapMode);
  const poolSwapInfo = useAppSelector(selectPoolSwapInfo);

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalInfo.error ? notionalInfo.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomRightTextColorToken={notionalInfo.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={formatNumber(poolSwapInfo.availableNotional[mode])}
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={notionalInfo.error !== null}
        label="Notional amount"
        maxLength={SwapFormNumberLimits.digitLimit}
        token={underlyingTokenName.toLowerCase() as TokenFieldProps['token']}
        tooltip="When you swap rates, the amount you receive and pay is calculated as a percentage or the notional value you choose."
        value={localNotional !== null ? localNotional : undefined}
        onChange={handleOnNotionalChange}
      />
    </NotionalAmountFieldBox>
  );
};
