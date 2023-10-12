import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../app';
import {
  selectPoolToken,
  selectSwapFormMarginAccountUI,
} from '../../../../../app/features/forms/trader/swap';
import { MarginAccountSelectorFormPreview } from '../../../../components/MarginAccountSelectorFormPreview';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useMarginAccountsForSelection } from '../../../../hooks/useMarginAccountsForSelection';

export const MarginAccount: React.FunctionComponent = () => {
  const navigate = useAppNavigate();
  const poolToken = useAppSelector(selectPoolToken);
  const { getMarginAccountsUIForForm, loading } = useMarginAccountsForSelection();
  const marginAccountsUI = getMarginAccountsUIForForm(poolToken);
  const selectedMarginAccountUI = useAppSelector(selectSwapFormMarginAccountUI);
  const { ammId, poolId } = useParams();
  if (!selectedMarginAccountUI) {
    return null;
  }
  const handleOnMarginAccountChange = (id: string) => {
    if (!ammId || !poolId) {
      return;
    }
    // TODO: FB evaluate before launch
    navigate.toSwapFormPage({
      ammId,
      poolId,
      marginAccountId: id,
    });
  };

  return (
    <MarginAccountSelectorFormPreview
      balanceCompactFormatted={selectedMarginAccountUI?.balanceCompactFormatted}
      initialMarginPretradeValueFormatted={
        selectedMarginAccountUI?.initialMarginPreTradeCompactFormatted
      }
      marginAccountsLoading={loading}
      marginAccountsUI={marginAccountsUI}
      poolToken={poolToken}
      selectedMarginAccountId={selectedMarginAccountUI?.id}
      onMarginAccountClick={handleOnMarginAccountChange}
    />
  );
};
