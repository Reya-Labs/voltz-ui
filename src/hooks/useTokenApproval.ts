import { useCallback, useEffect, useState } from 'react';
import { AugmentedAMM } from '@utilities';
import { isUndefined } from 'lodash';

export enum ApprovalType {
  FCM='FCM',
  UTOKEN_FCM='underlyingTokenFCM',
  YBTOKEN_FCM='yieldBearingTokenFCM',
  UTOKEN_PERIPHERY='UnderlyingTokenPeriphery'
};

export type ApprovalInfo = {
  text?: string;
  type: ApprovalType;
};

export type ApprovalErrorResponse = {
  code: number; 
  message: string;
};

export const useTokenApproval = (amm: AugmentedAMM, skipFCMChecks = false) => {
  const [checkingApprovals, setCheckingApprovals] = useState(false);
  const [approving, setApproving] = useState(false);
  const [lastApproval, setLastApproval] = useState<ApprovalInfo>();
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
      await amm.approveFCM();
      setFCMApproved(true);
      setLastApproval({ text: 'FCM', type: ApprovalType.FCM });
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
      await amm.approveUnderlyingTokenForFCM();
      setUnderlyingTokenApprovedForFCM(true);
      setLastApproval({ text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_FCM });
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
      await amm.approveUnderlyingTokenForPeriphery();
      setUnderlyingTokenApprovedForPeriphery(true);
      setLastApproval({ text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_PERIPHERY });
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
      await amm.approveYieldBearingTokenForFCM();
      setYieldBearingTokenApprovedForFCM(true);
      setLastApproval({ text: amm.protocol, type: ApprovalType.YBTOKEN_FCM });
      setApproving(false);
    } catch(e) {
      handleApprovalError(e as ApprovalErrorResponse);
      setYieldBearingTokenApprovedForFCM(false);
      setApproving(false);
    }
  }, [amm, setApproving, setYieldBearingTokenApprovedForFCM]);

  const getNextApproval = useCallback((isFCMAction: boolean): ApprovalInfo | undefined => {
    if(isFCMAction) {
      if(!FCMApproved) {
        return { text: 'FCM', type: ApprovalType.FCM };
      }
      if(!yieldBearingTokenApprovedForFCM) {
        return { text: amm.protocol, type: ApprovalType.YBTOKEN_FCM };
      }
      if(!underlyingTokenApprovedForFCM) {
        return { text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_FCM };
      }
    } else {
      if(!underlyingTokenApprovedForPeriphery) {
        return { text: amm.underlyingToken.name, type: ApprovalType.UTOKEN_PERIPHERY };
      }
    }
  }, [
    amm,
    FCMApproved, 
    yieldBearingTokenApprovedForFCM, 
    underlyingTokenApprovedForFCM, 
    underlyingTokenApprovedForPeriphery
  ]);

  return {
    approving,
    approveFCM,
    approveUnderlyingTokenForFCM,
    approveUnderlyingTokenForPeriphery,
    approveYieldBearingTokenForFCM,
    checkingApprovals,
    FCMApproved,
    getNextApproval,
    lastApproval,
    lastError,
    underlyingTokenApprovedForFCM,
    underlyingTokenApprovedForPeriphery,
    yieldBearingTokenApprovedForFCM
  }
}

export default useTokenApproval;