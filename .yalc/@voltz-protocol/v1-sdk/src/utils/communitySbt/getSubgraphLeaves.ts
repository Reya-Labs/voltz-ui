import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch';
import { LeafInfo } from '../../entities/communitySbt';

const tokensQuery = `
  query( $seasonStart: BigInt, $seasonEnd: BigInt, $firstCount: Int, $skipCount: Int) {
    badges(first: $firstCount, skip: $skipCount, where: {awardedTimestamp_gte: $seasonStart, awardedTimestamp_lt: $seasonEnd}) {
        id
        badgeType
        badgeName
        awardedTimestamp
        mintedTimestamp
    }
  }
`;

 export async function createLeaves(
    seasonStart: number,
    seasonEnd: number,
    subgraphUrl: string) : Promise<Array<LeafInfo>> {

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({ uri: subgraphUrl, fetch })
    })

    const firstCount = 1000;
    let skipCount = 0;

    let snapshot: Array<LeafInfo> = [];

    while (true) {
        const data = await client
        .query({
            query: gql(tokensQuery),
            variables: {
                seasonStart: seasonStart.toString(), // season/period start timmestamp
                seasonEnd: seasonEnd.toString(),
                firstCount: firstCount,
                skipCount: skipCount,
            },
        });

        for(const entry of data.data.badges) {
            const badgeType = parseInt(entry.badgeType);

            const props = entry.id.split("#");
            const address = props[0];

            const snpashotEntry = {
                account: address,
                badgeId: badgeType
            }
            snapshot.push(snpashotEntry);
        }

        skipCount += firstCount;
        if (data.data.badges.length !== firstCount) {
            break;
        }
    }

    return snapshot;

}