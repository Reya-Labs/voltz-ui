import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../app';
import {
  selectPoolToken,
  selectSwapFormMarginAccountForSwapLPUI,
} from '../../../../../app/features/forms/trader/swap';
import { MarginAccountSelectorFormPreview } from '../../../../components/MarginAccountSelectorFormPreview';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useMarginAccountsForSwapLP } from '../../../../hooks/useMarginAccountsForSwapLP';

export const MarginAccount: React.FunctionComponent = () => {
  const { ammId, poolId } = useParams();
  const navigate = useAppNavigate();
  const poolToken = useAppSelector(selectPoolToken);
  const { marginAccountsUI, loading } = useMarginAccountsForSwapLP(ammId, poolToken);
  const selectedMarginAccountUI = useAppSelector(selectSwapFormMarginAccountForSwapLPUI);
  if (!selectedMarginAccountUI || !poolToken) {
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
