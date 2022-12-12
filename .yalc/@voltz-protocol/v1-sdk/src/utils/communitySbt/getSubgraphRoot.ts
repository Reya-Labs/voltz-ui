import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';
import { Bytes } from 'ethers';

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
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: subgraphUrl, fetch }),
  });

  const data = await client.query({
    query: gql(rootsQuery),
    variables: {
      timestamp: timestamp,
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
