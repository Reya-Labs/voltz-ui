import { useCallback, useEffect, useState } from 'react';
import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';

export enum ApprovalType {
  FCM='FCM',
  UTOKEN_FCM='underlyingTokenFCM',
  YBTOKEN_FCM='yieldBearingTokenFCM',
  UTOKEN_PERIPHERY='UnderlyingTokenPeriphery'
};

export type ApprovalErrorResponse = {
  code: number; 
  message: string;
};

const useTokenApproval = (amm: AugmentedAMM, skipFCMChecks = false) => {
  const [checkingApprovals, setCheckingApprovals] = useState(false);
  const [approving, setApproving] = useState(false);
  const [lastApproval, setLastApproval] = useState<ApprovalType>();
  const [lastError, setLastError] = useState<ApprovalErrorResponse>();

  const [FCMApproved, setFCMApproved] = useState(false);
  const [underlyingTokenApprovedForFCM, setUnderlyingTokenApprovedForFCM] = useState(false);
  const [underlyingTokenApprovedForPeriphery, setUnderlyingTokenApprovedForPeriphery] = useState(false);
  const [yieldBearingTokenApprovedForFCM, setYieldBearingTokenApprovedForFCM] = useState(false);

  const handleApprovalError = (err: ApprovalErrorResponse) => {
    setLastError({
      code: !isUndefined(err?.code) ? err.code : 0,
      message: !isUndefined(err?.message) ? err.message : 'An unknown error has occurred',
    })
  }

  // Check if we need approval for any tokens (user might have approved these already)
  useEffect(() => {
    setCheckingApprovals(true);
    setLastApproval(undefined);
    setLastError(undefined);

    Promise.allSettled([
      skipFCMChecks ? Promise.resolve(true) : amm.isFCMApproved(),
      skipFCMChecks ? Promise.resolve(true) : amm.isUnderlyingTokenApprovedForFCM(),
      amm.isUnderlyingTokenApprovedForPeriphery(),
      skipFCMChecks ? Promise.resolve(true) : amm.isYieldBearingTokenApprovedForFCM()
    ])
      .then((responses) => {
        setFCMApproved(responses[0].status === 'fulfilled' ? !!responses[0].value : false);
        setUnderlyingTokenApprovedForFCM(responses[1].status === 'fulfilled' ? !!responses[1].value : false);
        setUnderlyingTokenApprovedForPeriphery(responses[2].status === 'fulfilled' ? !!responses[2].value : false);
        setYieldBearingTokenApprovedForFCM(responses[3].status === 'fulfilled' ? !!responses[3].value : false);
      })
      .catch(() => {
        setFCMApproved(false);
        setUnderlyingTokenApprovedForFCM(false);
        setUnderlyingTokenApprovedForPeriphery(false);
        setYieldBearingTokenApprovedForFCM(false);
      })
      .finally(() => {
        setCheckingApprovals(false);
      })
  }, [
    amm,
    setFCMApproved,
    setUnderlyingTokenApprovedForFCM,
    setUnderlyingTokenApprovedForPeriphery,
    setYieldBearingTokenApprovedForFCM,
  ]);

  const approveFCM = useCallback(async () => {
    setApproving(true);
    setLastError(undefined);
    try {
      const approved = await amm.approveFCM();
      setFCMApproved(!!approved);
      setLastApproval(ApprovalType.FCM);
      setApproving(false);
    } catch(e) {
      handleApprovalError(e as ApprovalErrorResponse);
      setFCMApproved(false);
      setApproving(false);
    }
  }, [amm, setApproving, setFCMApproved]);

  const approveUnderlyingTokenForFCM = useCallback(async () => {
    setApproving(true);
    setLastError(undefined);
    try {
      const approved = await amm.approveUnderlyingTokenForFCM();
      setUnderlyingTokenApprovedForFCM(!!approved);
      setLastApproval(ApprovalType.UTOKEN_FCM);
      setApproving(false);
    } catch(e) {
      handleApprovalError(e as ApprovalErrorResponse);
      setUnderlyingTokenApprovedForFCM(false);
      setApproving(false);
    }
  }, [amm, setApproving, setUnderlyingTokenApprovedForFCM]);

  const approveUnderlyingTokenForPeriphery = useCallback(async () => {
    setApproving(true);
    setLastError(undefined);
    try {
      const approved = await amm.approveUnderlyingTokenForPeriphery();
      setUnderlyingTokenApprovedForPeriphery(!!approved);
      setLastApproval(ApprovalType.UTOKEN_PERIPHERY);
      setApproving(false);
    } catch(e) {
      handleApprovalError(e as ApprovalErrorResponse);
      setUnderlyingTokenApprovedForPeriphery(false);
      setApproving(false);
    }
  }, [amm, setApproving, setUnderlyingTokenApprovedForPeriphery]);

  const approveYieldBearingTokenForFCM = useCallback(async () => {
    setApproving(true);
    setLastError(undefined);
    try {
      const approved = await amm.approveYieldBearingTokenForFCM();
      setYieldBearingTokenApprovedForFCM(!!approved);
      setLastApproval(ApprovalType.YBTOKEN_FCM);
      setApproving(false);
    } catch(e) {
      handleApprovalError(e as ApprovalErrorResponse);
      setYieldBearingTokenApprovedForFCM(false);
      setApproving(false);
    }
  }, [amm, setApproving, setYieldBearingTokenApprovedForFCM]);

  return {
    approving,
    approveFCM,
    approveUnderlyingTokenForFCM,
    approveUnderlyingTokenForPeriphery,
    approveYieldBearingTokenForFCM,
    checkingApprovals,
    lastApproval,
    lastError,
    FCMApproved,
    underlyingTokenApprovedForFCM,
    underlyingTokenApprovedForPeriphery,
    yieldBearingTokenApprovedForFCM
  }
}

export default useTokenApproval;