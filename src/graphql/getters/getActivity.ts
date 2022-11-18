/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ethers } from 'ethers';
import { GraphQLClient, gql } from 'graphql-request';
import axios from 'axios';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const getActivityQuery = (skip: number) => `
  {
    wallets(first: 1000, skip:${skip}) {
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

const geckoEthToUsd = async () => {
  if (!process.env.REACT_APP_COINGECKO_API_KEY) {
    return 0;
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const data = await axios.get<{
        ethereum: {
          usd: number;
        };
      }>(
        `https://pro-api.coingecko.com/api/v3/simple/price?x_cg_pro_api_key=${process.env.REACT_APP_COINGECKO_API_KEY}&ids=ethereum&vs_currencies=usd`,
      );
      return data.data.ethereum.usd;
    } catch (error) {}
  }
  return 0;
};

type ActivityArgs = {
  from: number;
  end?: number;
};

type Activity = {
  total: Map<string, number>;
};

export async function getActivity({ from, end }: ActivityArgs): Promise<Activity> {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/voltzprotocol/mainnet-v1';
  const graphQLClient = new GraphQLClient(endpoint);

  const ethPrice = await geckoEthToUsd();

  let to = Math.floor(Date.now() / 1000);
  if (end) {
    to = end;
  }

  const scores: Map<string, number> = new Map<string, number>();

  let skip = 0;
  while (true) {
    const data = await graphQLClient.request(
      gql`
        ${getActivityQuery(skip)}
      `,
    );
    skip += 1000;

    const activity = JSON.parse(JSON.stringify(data, undefined, 2));

    for (const wallet of activity.wallets) {
      let score = 0;

      for (const position of wallet.positions) {
        const token = position.amm.rateOracle.token.name;
        const decimals: number = position.amm.rateOracle.token.decimals;

        const termEnd = Number(
          ethers.utils.formatUnits(position.amm.termEndTimestamp.toString(), 18),
        );

        for (const swap of position.swaps) {
          const swapTime: number = swap.transaction.createdTimestamp;
          const swapNotional = Number(
            ethers.utils.formatUnits(swap.variableTokenDelta.toString(), decimals),
          );

          if (from < swapTime && swapTime <= to) {
            const timeWeightedNotional =
              (Math.abs(swapNotional) * (termEnd - swapTime)) / ONE_YEAR_SECONDS;
            switch (token) {
              case 'ETH': {
                score += timeWeightedNotional * ethPrice;
                break;
              }
              default: {
                score += timeWeightedNotional;
              }
            }
          }
        }
      }

      if (score > 0) {
        scores.set(wallet.id as string, score);
      }
    }

    if (activity.wallets.length < 1000) {
      break;
    }
  }

  return {
    total: new Map(scores),
  };
}
