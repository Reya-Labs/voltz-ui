/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';

import { useGetWalletQuery } from '@graphql';
import { selectors } from '@store';
import { useSelector } from '@hooks';
import { WalletStatus, WalletName, WalletEthereum } from './types';
import WalletContext from './WalletContext';
import { getErrorMessage } from '@utilities';
import { isUndefined } from 'lodash';

export type ProviderWrapperProps = {
  status: WalletStatus;
  setStatus: React.Dispatch<React.SetStateAction<WalletStatus>>;
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  name: WalletName | null;
  setName: React.Dispatch<React.SetStateAction<WalletName | null>>;
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
  required: boolean;
  setRequired: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProviderWrapper: React.FunctionComponent<ProviderWrapperProps> = ({
  status,
  setStatus,
  account,
  setAccount,
  name,
  setName,
  balance,
  setBalance,
  required,
  setRequired,
  children,
}) => {
  const [polling, setPolling] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<string>();
  const {
    status: metamaskStatus,
    connect: metamaskConnect,
    account: metamaskAccount,

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ethereum: metamaskEthereum,
  } = useMetaMask();

  useEffect(() => {
    if (name === 'metamask') {
      setStatus(metamaskStatus);
    }
  }, [name, setStatus, metamaskStatus]);

  const excludeWallet = (riskReport: any[]) => {
    const size = riskReport[0].addressRiskIndicators.length
    // eslint-disable-next-line
    console.log('riskReport risk indicators: ', riskReport[0].addressRiskIndicators)
    for (let i = 0; i < size; i++) {
      if (riskReport[0].addressRiskIndicators[i].categoryRiskScoreLevel) {

        const score = riskReport[0].addressRiskIndicators[i].categoryRiskScoreLevel
        if (score >= 10) {
          return true;
        }
      }
    }
    return false;
  };


  useEffect(() => {
    if (name === 'metamask') {
      if (!isUndefined(metamaskAccount) && metamaskAccount) {
        postWalletData(metamaskAccount).then((data) => {

          if (data && data[0].addressRiskIndicators) {
            // eslint-disable-next-line
            console.log('Value of exclude wallet: ', excludeWallet(data))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            if (!excludeWallet(data)) {
              setAccount(metamaskAccount)
            } else {
              setWalletError('Risky Account Detected')
            }
          } else {
            setAccount(metamaskAccount)
          }
        }, (error) => {
          // eslint-disable-next-line
          console.log('ERROR')
        })
      }
    };
  }, [name, setAccount, metamaskAccount]);

  async function postWalletData(walletId: string) {
    const result = await fetch('https://api.trmlabs.com/public/v2/screening/addresses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Basic ' + btoa(process.env.REACT_APP_TRM_API_KEY || '')
      },
      body: JSON.stringify([{
        address: walletId,
        chain: 'ethereum'
      }])
    });

    if (result.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await result.json();
      // eslint-disable-next-line
      // console.log(data);
      // THE BELOW DATA2 IS TEST DATA FOR A RISKY ACCOUNT
      // const data2 =
      //   [
      //     {
      //       "accountExternalId": "customer123",
      //       "address": "149w62rY42aZBox8fGcmqNsXUzSStKeq8C",
      //       "addressRiskIndicators": [
      //         {
      //           "category": "Sanctions",
      //           "categoryId": "69",
      //           "categoryRiskScoreLevel": 15,
      //           "categoryRiskScoreLevelLabel": "Severe",
      //           "incomingVolumeUsd": "387155446.31",
      //           "outgoingVolumeUsd": "28324.01",
      //           "riskType": "INDIRECT",
      //           "totalVolumeUsd": "387183770.32"
      //         },
      //         {
      //           "category": "Ransomware",
      //           "categoryId": "58",
      //           "categoryRiskScoreLevel": 10,
      //           "categoryRiskScoreLevelLabel": "High",
      //           "incomingVolumeUsd": "6342083.387155446",
      //           "outgoingVolumeUsd": "6360433.509636739",
      //           "riskType": "OWNERSHIP",
      //           "totalVolumeUsd": "12702516.896792185"
      //         },
      //         {
      //           "category": "Ransomware",
      //           "categoryId": "58",
      //           "categoryRiskScoreLevel": 10,
      //           "categoryRiskScoreLevelLabel": "High",
      //           "incomingVolumeUsd": "10358.155950527",
      //           "outgoingVolumeUsd": "64919.190147929",
      //           "riskType": "COUNTERPARTY",
      //           "totalVolumeUsd": "75277.346098456"
      //         }
      //       ],
      //       "addressSubmitted": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      //       "chain": "bitcoin",
      //       "entities": [
      //         {
      //           "category": "Ransomware",
      //           "categoryId": "58",
      //           "entity": "SamSam",
      //           "riskScoreLevel": 15,
      //           "riskScoreLevelLabel": "Severe",
      //           "trmAppUrl": "https://app.trmlabs.com/entities/trm/439c54d9-e9ca-43d1-be98-0cb0a68fd16e",
      //           "trmUrn": "/entity/manual/439c54d9-e9ca-43d1-be98-0cb0a68fd16e"
      //         }
      //       ],
      //       "trmAppUrl": "https://app.trmlabs.com/address/149w62rY42aZBox8fGcmqNsXUzSStKeq8C/btc"
      //     }
      //   ]
      // eslint-disable-next-line
      // console.log('test data2: ', data2[0].addressRiskIndicators[0].categoryRiskScoreLevel)
      return data;
    } else {
      const txt = await result.text();
      // eslint-disable-next-line
      console.log(txt);
    }
  }

  const connect = useCallback(
    async (walletName: WalletName) => {
      setName(walletName);

      if (walletName === 'metamask') {
        try {
          return await metamaskConnect();

        } catch (error) {
          let errorMessage = getErrorMessage(error);
          if (errorMessage.endsWith(".")) {
            errorMessage = errorMessage.slice(0, -1);
          }
          setWalletError(errorMessage);
          return null;
        }
      }

      return null;
    },
    [setName, metamaskConnect],
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ethereum = useMemo((): WalletEthereum | null => {
    switch (name) {
      case 'metamask':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return metamaskEthereum as WalletEthereum;

      default:
        return null;
    }
  }, [name, metamaskEthereum]);
  const signer = useMemo((): ethers.providers.JsonRpcSigner | null => {
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum, 'any');
        return provider.getSigner();
      } catch (error) {
        setWalletError(getErrorMessage(error));
        return null;
      }
    }

    return null;
  }, [ethereum]);

  const pollInterval = polling ? 500 : undefined;
  const { data, loading, error, stopPolling } = useGetWalletQuery({
    variables: { id: account || '' },
    pollInterval,
  });

  const unresolvedTransactions = useSelector(selectors.unresolvedTransactionsSelector);
  const shouldPoll = unresolvedTransactions.length > 0;

  useEffect(() => {
    setPolling(shouldPoll && !error);

    if (!shouldPoll || error) {
      stopPolling();
    }
  }, [error, shouldPoll, setPolling, stopPolling]);

  useEffect(() => {
    const provider = signer?.provider;
    if (provider) {
      // See https://eth.wiki/json-rpc/API#net_version for response info
      provider.send('net_version', [])
        .then((resp: string) => {
          setNetworkId(resp);
          if (!resp || resp !== process.env.REACT_APP_METAMASK_NETWORK_ID) {
            setWalletError('Wrong network');
          }
        })
        .catch(() => {
          setNetworkId(undefined);
        })
    }
  }, [signer]);

  const value = {
    status,
    connect,
    account,
    name,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ethereum,
    signer,
    balance,
    setBalance,
    wallet: data && data.wallet ? data.wallet : null,
    loading,
    error: !!error,
    required,
    setRequired,
    walletError,
    networkId,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default ProviderWrapper;