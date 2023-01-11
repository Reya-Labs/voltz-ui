import { gql } from '@apollo/client';
import JSBI from 'jsbi';

import { client } from '../../../graphql';

const query = `
  query GetAMMs($orderBy: AMM_orderBy!) {
    amms(first: 100, orderBy: $orderBy, orderDirection: asc) {
      id
      createdTimestamp
      fcm {
        id
      }
      marginEngine {
        id
      }
      rateOracle {
        id
        protocolId
        token {
          id
          name
          decimals
        }
      }
  
      tickSpacing
      termStartTimestamp
      termEndTimestamp
  
      totalNotionalTraded
      totalLiquidity
  
      updatedTimestamp
      tick
  
      txCount
    }
  }
`;

export type QueryAMM = {
  id: string;
  marginEngine: { id: string };
  rateOracle: {
    id: string;
    protocolId: string;
    token: { id: string; name: string; decimals: number };
  };
  tickSpacing: string;
  termStartTimestamp: JSBI;
  termEndTimestamp: JSBI;
};

export const getAMMs = async (aMMsSortOrderIds: string[] = []): Promise<QueryAMM[]> => {
  try {
    const result = await client.query<{
      amms: QueryAMM[];
    }>({
      query: gql(query),
      variables: { orderBy: 'id' },
    });
    const aMMs = result.data.amms;
    if (aMMsSortOrderIds.length === 0) {
      return aMMs;
    }
    return aMMs
      .slice()
      .sort(
        (a, b) =>
          aMMsSortOrderIds.findIndex((p) => p.toLowerCase() === a.id.toLowerCase()) -
          aMMsSortOrderIds.findIndex((p) => p.toLowerCase() === b.id.toLowerCase()),
      );
  } catch (err) {
    throw err;
  }
};
