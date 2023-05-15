import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectAMMTokenFormatted,
  selectGasFeeETHFormatted,
  selectProspectiveSwapFeeFormatted,
  selectSlippageFormatted,
  selectSubmitButtonInfo,
} from '../../../../../app/features/forms/trader/swap';
import { useAppSelector } from '../../../../../app/hooks';
import { ReactComponent as GasIcon } from './gas-icon.svg';
import { IconTextWrapper, TransactionDetailBox } from './TransactionDetails.styled';

type TransactionDetailsProps = {};

export const TransactionDetails: React.FunctionComponent<TransactionDetailsProps> = () => {
  const token = useAppSelector(selectAMMTokenFormatted);
  const submitButtonInfo = useAppSelector(selectSubmitButtonInfo);
  const slippageFormatted = useAppSelector(selectSlippageFormatted);
  const feeFormatted = useAppSelector(selectProspectiveSwapFeeFormatted);
  const gasFeeETHFormatted = useAppSelector(selectGasFeeETHFormatted);

  const hideFees = submitButtonInfo.state === 'margin-update';
  const hideSlippage = submitButtonInfo.state === 'margin-update';

  return (
    <React.Fragment>
      {hideFees ? null : (
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Fees
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={token}
            typographyToken="secondaryBodySmallRegular"
            value={feeFormatted}
          />
        </TransactionDetailBox>
      )}
      {hideSlippage ? null : (
        <TransactionDetailBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Estimated Slippage
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="secondaryBodySmallRegular"
            value={slippageFormatted}
          />
        </TransactionDetailBox>
      )}
      <TransactionDetailBox>
        <IconTextWrapper>
          <GasIcon />
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Gas Fees
          </Typography>
        </IconTextWrapper>
        <TokenTypography
          colorToken="lavenderWeb"
          token=" ETH"
          typographyToken="secondaryBodySmallRegular"
          value={gasFeeETHFormatted}
        />
      </TransactionDetailBox>
    </React.Fragment>
  );
};
