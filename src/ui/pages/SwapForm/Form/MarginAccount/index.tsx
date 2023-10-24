import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  resetStateAction,
  selectPoolToken,
  selectPoolTokenFormatted,
  selectSwapFormMarginAccountForSwapLPUI,
} from '../../../../../app/features/forms/trader/swap';
import { MarginAccountSelectorFormPreview } from '../../../../components/MarginAccountSelectorFormPreview';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useMarginAccountsForSwapLP } from '../../../../hooks/useMarginAccountsForSwapLP';

export const MarginAccount: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const navigate = useAppNavigate();
  const poolTokenFormatted = useAppSelector(selectPoolTokenFormatted);
  const poolToken = useAppSelector(selectPoolToken);
  const { marginAccountsUI, loading } = useMarginAccountsForSwapLP(ammId, poolToken);
  const selectedMarginAccountUI = useAppSelector(selectSwapFormMarginAccountForSwapLPUI);
  if (!selectedMarginAccountUI || !poolTokenFormatted) {
    return null;
  }
  const handleOnMarginAccountChange = (id: string) => {
    if (!ammId || !poolId) {
      return;
    }
    dispatch(resetStateAction());
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
      poolTokenFormatted={poolTokenFormatted}
      selectedMarginAccountId={selectedMarginAccountUI?.id}
      onMarginAccountClick={handleOnMarginAccountChange}
    />
  );
};
