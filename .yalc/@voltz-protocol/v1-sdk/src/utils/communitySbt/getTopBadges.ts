import { gql } from '@apollo/client';
import { ethers } from 'ethers';
import { ONE_YEAR_IN_SECONDS } from '../../constants';
import { getApolloClient } from './getApolloClient';

export type GetScoresArgs = {
  seasonStart: number;
  seasonEnd: number;
  subgraphUrl: string;
  ethPrice: number;
  ignoredWalletIds: Record<string, boolean>;
  isLP: boolean;
};

export type MintOrBurnAction = {
  transaction: {
    createdTimestamp: number;
  };
  amount: string;
};

export type SwapAction = {
  transaction: {
    createdTimestamp: number;
  };
  cumulativeFeeIncurred: number;
  variableTokenDelta: string;
};

export enum ActionType {
  SWAP,
  MINT,
  BURN,
}

export type UpdateScoreArgs = {
  score: number;
  actions: MintOrBurnAction[] | SwapAction[];
  actionType: ActionType;
  decimals: number;
  token: string;
  seasonStart: number;
  seasonEnd: number;
  termEnd: number;
  ethPrice: number;
};

function updateScore({
  score,
  actions,
  actionType,
  decimals,
  token,
  seasonStart,
  seasonEnd,
  termEnd,
  ethPrice,
}: UpdateScoreArgs): number {
  let calculatedScore = score;
  for (const action of actions) {
    const actionTime: number = action.transaction.createdTimestamp;
    let amount = '';
    switch (actionType) {
      case ActionType.SWAP:
        amount = (action as SwapAction).variableTokenDelta.toString();
        break;
      case ActionType.MINT:
      case ActionType.BURN:
        amount = (action as MintOrBurnAction).amount.toString();
        break;
      default:
        amount = '0';
        break;
    }
    const mintNotional = Number(ethers.utils.formatUnits(amount, decimals));

    if (seasonStart < actionTime && actionTime <= seasonEnd) {
      const timeWeightedNotional =
        (Math.abs(mintNotional) * (termEnd - actionTime)) / ONE_YEAR_IN_SECONDS;
      switch (token) {
        case 'ETH': {
          calculatedScore +=
            (actionType === ActionType.BURN ? -1 : 1) * timeWeightedNotional * ethPrice;
          break;
        }
        default: {
          calculatedScore += (actionType === ActionType.BURN ? -1 : 1) * timeWeightedNotional;
        }
      }
    }
  }
  return calculatedScore;
}

/**
 * @dev Query the Main subgraph and retrieve season's liquidity
 * or trading score of all users based on time weighted liquidity.
 * Score is based on both mints and swaps.
 */
export async function getScores({
  seasonStart,
  seasonEnd,
  subgraphUrl,
  ethPrice,
  ignoredWalletIds,
  isLP,
}: GetScoresArgs): Promise<Record<string, number>> {
  const activityQuery = `
        query( $lastId: String) {
            wallets(first: 1000, where: {id_gt: $lastId}) {
                id
                positions {
                    amm {
                        termEndTimestamp
                        rateOracle {
                            token {
                                name
                                decimals
                            }
                        }
                    }
                    mints {
                        transaction {
                            createdTimestamp
                        }
                        amount
                    }
                    burns {
                        transaction {
                            createdTimestamp
                        }
                        amount
                    }
                    swaps {
                        transaction {
                            createdTimestamp
                        }
                        cumulativeFeeIncurred
                        variableTokenDelta
                    }
                }
            }
        }
      `;

  const client = getApolloClient(subgraphUrl);

  const scores: Record<string, number> = {};

  let lastId = '0';
  while (true) {
    const data = await client.query({
      query: gql(activityQuery),
      variables: {
        lastId,
      },
    });

    const wallets = data?.data?.wallets ?? [];

    for (const wallet of wallets) {
      let score = 0;

      for (const position of wallet.positions) {
        const token = position.amm.rateOracle.token.name;
        const decimals: number = position.amm.rateOracle.token.decimals;

        const termEnd = Number(
          ethers.utils.formatUnits(position.amm.termEndTimestamp.toString(), 18),
        );

        const args: UpdateScoreArgs = {
          score,
          actions: position.burns as MintOrBurnAction[],
          actionType: ActionType.BURN,
          decimals,
          token,
          seasonStart,
          seasonEnd,
          termEnd,
          ethPrice,
        };
        if (isLP) {
          const burnArgs: UpdateScoreArgs = {
            ...args,
            actionType: ActionType.BURN,
            actions: position.burns as MintOrBurnAction[],
          };
          score = updateScore(burnArgs);
          const mintArgs: UpdateScoreArgs = {
            ...args,
            score,
            actionType: ActionType.MINT,
            actions: position.mints as MintOrBurnAction[],
          };
          score = updateScore(mintArgs);
        } else {
          const swapArgs: UpdateScoreArgs = {
            ...args,
            actionType: ActionType.SWAP,
            actions: position.swaps as SwapAction[],
          };
          score = updateScore(swapArgs);
        }
      }

      if (score > 0 && !ignoredWalletIds[wallet.id.toLowerCase()]) {
        scores[wallet.id] = score;
      }
      lastId = wallet.id;
    }

    if (wallets < 1000) {
      break;
    }
  }
  return scores;
}
