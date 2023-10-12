import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch } from '../../../app';
import { openMarginAccountDepositFlowAction } from '../../../app/features/deposit-flow';
import { MarginAccountUI } from '../../../app/features/portfolio/types';
import { CompactFormatParts } from '../../../utilities/number';
import { useWallet } from '../../hooks/useWallet';
import { DepositMarginDialog } from '../../pages/Portfolio/PortfolioSubmenu/SubmenuActionButtons/WithdrawDepositFlow/DepositMarginDialog';
import { MarginAccountsSearchField } from '../MarginAccountsSearchField';
import {
  Box,
  DepositButton,
  DepositButtonBox,
  DetailBox,
  DetailsBox,
} from './MarginAccountSelectorFormPreview.styled';

type MarginAccountSelectorFormPreviewProps = {
  poolToken: string;
  balanceCompactFormatted: CompactFormatParts;
  initialMarginPretradeValueFormatted: CompactFormatParts;
  marginAccountsUI: MarginAccountUI[];
  marginAccountsLoading: boolean;
  selectedMarginAccountId?: MarginAccountUI['id'];
  onMarginAccountClick: (marginAccountId: string) => void;
};

export const MarginAccountSelectorFormPreview: React.FunctionComponent<
  MarginAccountSelectorFormPreviewProps
> = ({
  poolToken,
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
          <MarginAccountsSearchField
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
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Margin Account Balance
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={`${balanceCompactFormatted.compactSuffix} ${(poolToken || '').toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value={balanceCompactFormatted.compactNumber}
          />
        </DetailBox>
        <DetailBox>
          <Typography colorToken="lavenderWeb3" typographyToken="primaryBodySmallRegular">
            Account Initial Margin (Pre Trade)
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token={`${initialMarginPretradeValueFormatted.compactSuffix} ${(
              poolToken || ''
            ).toUpperCase()}`}
            typographyToken="secondaryBodySmallRegular"
            value={initialMarginPretradeValueFormatted.compactNumber}
          />
        </DetailBox>
      </DetailsBox>
    </Box>
  );
};
