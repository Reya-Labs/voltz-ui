import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch } from '../../../app';
import { openMarginAccountDepositFlowAction } from '../../../app/features/deposit-flow';
import { MarginAccountForSwapLPUI } from '../../../app/features/margin-accounts-for-swap-lp';
import { CompactFormatParts } from '../../../utilities/number';
import { useWallet } from '../../hooks/useWallet';
import { DepositMarginDialog } from '../../pages/Portfolio/PortfolioSubmenu/SubmenuActionButtons/WithdrawDepositFlow/DepositMarginDialog';
import {
  Box,
  DepositButton,
  DepositButtonBox,
  DetailBox,
  DetailsBox,
} from './MarginAccountSelectorFormPreview.styled';
import { MarginAccountsForSwapLPSearchField } from './MarginAccountsForSwapLPSearchField';

type MarginAccountSelectorFormPreviewProps = {
  poolTokenFormatted: string;
  balanceCompactFormatted: CompactFormatParts;
  initialMarginPretradeValueFormatted: CompactFormatParts;
  marginAccountsUI: MarginAccountForSwapLPUI[];
  marginAccountsLoading: boolean;
  selectedMarginAccountId?: MarginAccountForSwapLPUI['id'];
  onMarginAccountClick: (marginAccountId: string) => void;
};

export const MarginAccountSelectorFormPreview: React.FunctionComponent<
  MarginAccountSelectorFormPreviewProps
> = ({
  poolTokenFormatted,
  balanceCompactFormatted,
  initialMarginPretradeValueFormatted,
  marginAccountsUI,
  selectedMarginAccountId,
  onMarginAccountClick,
  marginAccountsLoading,
}) => {
  const dispatch = useAppDispatch();
  const { setRequired, account } = useWallet();
  const handleOnDepositButtonClick = () => {
    if (!account) {
      setRequired(true);
      return;
    }
    dispatch(
      openMarginAccountDepositFlowAction({
        disableMarginAccountSelection: true,
        selectedMarginAccountId,
      }),
    );
  };

  return (
    <Box>
      <DepositMarginDialog />
      <DetailsBox>
        <DetailBox>
          <MarginAccountsForSwapLPSearchField
            disabled={marginAccountsLoading}
            marginAccounts={marginAccountsUI}
            selectedMarginAccountId={selectedMarginAccountId || ''}
            onMarginAccountClick={onMarginAccountClick}
          />
          <DepositButtonBox>
            <DepositButton
              typographyToken="primaryBodySmallRegular"
              variant="secondary"
              onClick={handleOnDepositButtonClick}
            >
              Deposit
            </DepositButton>
          </DepositButtonBox>
        </DetailBox>
        <DetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Margin Account Balance
          </Typography>
          <TokenTypography
            colorToken="white"
            token={`${balanceCompactFormatted.compactSuffix}${poolTokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={balanceCompactFormatted.compactNumber}
          />
        </DetailBox>
        <DetailBox>
          <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
            Account Initial Margin (Pre Trade)
          </Typography>
          <TokenTypography
            colorToken="white"
            token={`${initialMarginPretradeValueFormatted.compactSuffix}${poolTokenFormatted}`}
            typographyToken="secondaryBodySmallRegular"
            value={initialMarginPretradeValueFormatted.compactNumber}
          />
        </DetailBox>
      </DetailsBox>
    </Box>
  );
};
