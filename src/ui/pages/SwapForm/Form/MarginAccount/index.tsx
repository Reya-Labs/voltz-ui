import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../../app';
import {
  selectPoolTokenFormatted,
  selectSwapFormMarginAccountUI,
} from '../../../../../app/features/forms/trader/swap';
import { MarginAccountSelectorFormPreview } from '../../../../components/MarginAccountSelectorFormPreview';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useMarginAccountsForSelection } from '../../../../hooks/useMarginAccountsForSelection';

export const MarginAccount: React.FunctionComponent = () => {
  const navigate = useAppNavigate();
  const token = useAppSelector(selectPoolTokenFormatted);
  const { marginAccountsUI, loading } = useMarginAccountsForSelection();
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
      balanceCompactFormatted={selectedMarginAccountUI?.balanceCompactFormat}
      initialMarginPretradeValueFormatted={'123'}
      marginAccountsLoading={loading}
      marginAccountsUI={marginAccountsUI}
      selectedMarginAccountId={selectedMarginAccountUI?.id}
      token={token}
      onMarginAccountClick={handleOnMarginAccountChange}
    />
  );
};
