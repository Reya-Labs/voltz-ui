import { AMM } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';
import { useCallback, useEffect, useState } from 'react';

import { getSentryTracker } from '../utilities/sentry';

export enum ApprovalType {
  UTOKEN_PERIPHERY = 'UnderlyingTokenPeriphery',
}

export type ApprovalInfo = {
  text?: string;
  type: ApprovalType;
};

export type ApprovalErrorResponse = {
  code: number;
  message: string;
};

export const useTokenApproval = (amm: AMM, forceErc20Check: boolean, margin?: number) => {
  const [checkingApprovals, setCheckingApprovals] = useState(false);
  const [approving, setApproving] = useState(false);
  const [lastApproval, setLastApproval] = useState<ApprovalInfo>();
  const [lastError, setLastError] = useState<ApprovalErrorResponse>();

  const [underlyingTokenApprovedForPeriphery, setUnderlyingTokenApprovedForPeriphery] =
    useState(false);

  const handleApprovalError = (err: ApprovalErrorResponse) => {
    setLastError({
      code: !isUndefined(err?.code) ? err.code : 0,
      message: !isUndefined(err?.message) ? err.message : 'An unknown error has occurred',
    });
  };

  // Check if we need approval for any tokens (user might have approved these already)
  useEffect(() => {
    setCheckingApprovals(true);
    setLastApproval(undefined);
    setLastError(undefined);

    amm
      .isTokenApprovedForPeriphery({
        forceErc20Check: forceErc20Check,
        approvalAmount: margin,
      })
      .then((response) => {
        setUnderlyingTokenApprovedForPeriphery(response ?? false);
      })
      .catch(() => {
        setUnderlyingTokenApprovedForPeriphery(false);
      })
      .finally(() => {
        setCheckingApprovals(false);
      });
  }, [amm, margin, setUnderlyingTokenApprovedForPeriphery]);

  const approveUnderlyingTokenForPeriphery = useCallback(async () => {
    setApproving(true);
    setLastError(undefined);
    try {
      await amm.approveUnderlyingTokenForPeriphery();
      setUnderlyingTokenApprovedForPeriphery(true);
      setLastApproval({ text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_PERIPHERY });
      setApproving(false);
    } catch (e) {
      getSentryTracker().captureException(e);
      handleApprovalError(e as ApprovalErrorResponse);
      setUnderlyingTokenApprovedForPeriphery(false);
      setApproving(false);
    }
  }, [amm, setApproving, setUnderlyingTokenApprovedForPeriphery]);

  const getNextApproval = useCallback((): ApprovalInfo | undefined => {
    if (!underlyingTokenApprovedForPeriphery) {
      return { text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_PERIPHERY };
    }
  }, [amm, underlyingTokenApprovedForPeriphery]);

  return {
    approving,
    approveUnderlyingTokenForPeriphery,
    checkingApprovals,
    getNextApproval,
    lastApproval,
    lastError,
    underlyingTokenApprovedForPeriphery,
  };
};
