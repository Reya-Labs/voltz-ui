import { useCallback, useEffect, useState } from 'react';
import { AugmentedAMM } from '@utilities';

const useTokenApproval = (amm: AugmentedAMM) => {
  const [checkingApprovals, setCheckingApprovals] = useState(false);
  const [approving, setApproving] = useState(false);

  const [FCMApproved, setFCMApproved] = useState(false);
  const [underlyingTokenApprovedForFCM, setUnderlyingTokenApprovedForFCM] = useState(false);
  const [underlyingTokenApprovedForPeriphery, setUnderlyingTokenApprovedForPeriphery] = useState(false);
  const [yieldBearingTokenApprovedForFCM, setYieldBearingTokenApprovedForFCM] = useState(false);

  // Check if we need approval for any tokens (user might have approved these already)
  useEffect(() => {
    setCheckingApprovals(true);
    Promise.allSettled([
      amm.isFCMApproved(),
      amm.isUnderlyingTokenApprovedForFCM(),
      amm.isUnderlyingTokenApprovedForPeriphery(),
      amm.isYieldBearingTokenApprovedForFCM()
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
    try {
      const approved = await amm.approveFCM();
      setFCMApproved(!!approved);
      setApproving(false);
    } catch(e) {
      setFCMApproved(false);
      setApproving(false);
    }
  }, [amm, setApproving, setFCMApproved]);

  const approveUnderlyingTokenForFCM = useCallback(async () => {
    setApproving(true);
    try {
      const approved = await amm.approveUnderlyingTokenForFCM();
      setUnderlyingTokenApprovedForFCM(!!approved);
      setApproving(false);
    } catch(e) {
      setUnderlyingTokenApprovedForFCM(false);
      setApproving(false);
    }
  }, [amm, setApproving, setUnderlyingTokenApprovedForFCM]);

  const approveUnderlyingTokenForPeriphery = useCallback(async () => {
    setApproving(true);
    try {
      const approved = await amm.approveUnderlyingTokenForPeriphery();
      setUnderlyingTokenApprovedForPeriphery(!!approved);
      setApproving(false);
    } catch(e) {
      setUnderlyingTokenApprovedForPeriphery(false);
      setApproving(false);
    }
  }, [amm, setApproving, setUnderlyingTokenApprovedForPeriphery]);

  const approveYieldBearingTokenForFCM = useCallback(async () => {
    setApproving(true);
    try {
      const approved = await amm.approveYieldBearingTokenForFCM();
      setYieldBearingTokenApprovedForFCM(!!approved);
      setApproving(false);
    } catch(e) {
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
    FCMApproved,
    underlyingTokenApprovedForFCM,
    underlyingTokenApprovedForPeriphery,
    yieldBearingTokenApprovedForFCM
  }
}

export default useTokenApproval;