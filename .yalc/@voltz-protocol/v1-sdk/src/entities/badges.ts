import { ContractReceipt, Signer } from 'ethers';
import { getGasBuffer } from '../constants';
import { ERC721LeaderboardNFT__factory as badgesFactory } from '../typechain';

import * as resultsJson from './results.json'; // Input provided by the SDK

export type BadgeResponse = {
  status: 'SUCCESS' | 'FAIL';
  error?: string;
  receipt?: ContractReceipt;
};

export const redeemBadge = async (
  badgesAddress: string,
  signer: Signer,
  season: string,
  simulation: boolean,
): Promise<BadgeResponse> => {
  const badgesContract = badgesFactory.connect(badgesAddress, signer);

  const address = await signer.getAddress();
  let metadata;

  if (season in Object.keys(resultsJson)) {
    const ls = resultsJson[season as keyof typeof resultsJson];
    let index = -1;
    for (let i = 0; i < ls.length; i += 1) {
      if (ls[i].address.toLowerCase() === address.toLowerCase()) {
        index = i;
      }
    }
    if (index === -1) {
      return {
        status: 'FAIL',
        error: `No such address in this season ${address.toLowerCase()}.`,
      };
    }
    metadata = ls[index];
  } else {
    return {
      status: 'FAIL',
      error: `No such season ${season}.`,
    };
  }

  const { metadataURI, approval, position } = metadata;

  try {
    await badgesContract.callStatic.redeem(
      address,
      metadataURI,
      position.toString(),
      season,
      approval,
    );
  } catch (error) {
    return {
      status: 'FAIL',
      error: 'Simulation failed',
    };
  }

  if (simulation) {
    return {
      status: 'SUCCESS',
    };
  }

  try {
    const estimatedGas = await badgesContract.estimateGas.redeem(
      address,
      metadataURI,
      position.toString(),
      season,
      approval,
    );
    const tx = await badgesContract.redeem(
      address,
      metadataURI,
      position.toString(),
      season,
      approval,
      {
        gasLimit: getGasBuffer(estimatedGas),
      },
    );
    const receipt = await tx.wait();

    return {
      status: 'SUCCESS',
      receipt,
    };
  } catch (error) {
    return {
      status: 'FAIL',
      error: 'Transaction failed',
    };
  }
};
