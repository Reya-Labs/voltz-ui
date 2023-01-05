import { gql } from '@apollo/client';
import { Bytes } from 'ethers';
import { getApolloClient } from './getApolloClient';

const rootsQuery = `
  query($timestamp: BigInt) {
    roots(where: {startTimestamp_lte: $timestamp, endTimestamp_gte: $timestamp}) {
        id
        root
        startTimestamp
        endTimestamp
        metadataURIBase
    }
  }
`;

export type RootEntity = {
  merkleRoot: Bytes;
  baseMetadataUri: string;
  startTimestamp: number;
  endTimestamp: number;
};

export async function getRootFromSubgraph(
  timestamp: number,
  subgraphUrl: string,
): Promise<RootEntity | undefined> {
  const client = getApolloClient(subgraphUrl);

  const data = await client.query({
    query: gql(rootsQuery),
    variables: {
      timestamp,
    },
  });

  // TODO: add support for multiple roots, [0] is not enough
  const rootEntity = (data.data.roots || [])[0];
  if (!rootEntity) {
    return undefined;
  }

  return {
    merkleRoot: rootEntity.root,
    baseMetadataUri: rootEntity.metadataURIBase,
    startTimestamp: rootEntity.startTimestamp,
    endTimestamp: rootEntity.endTimestamp,
  };
}
