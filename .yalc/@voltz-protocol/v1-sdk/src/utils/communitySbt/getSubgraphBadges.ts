import { BadgeResponse } from "../../entities";
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { SubgraphBadgeResponse } from "../../entities/communitySbt";
import { toMillis } from "./helpers";
import { sentryTracker } from "../sentry";

export async function getSubgraphBadges({
    userId,
    seasonId,
    seasonStart,
    seasonEnd,
    badgesSubgraphUrl
  }: {
    userId: string;
    seasonId: number;
    seasonStart: number,
    seasonEnd: number,
    badgesSubgraphUrl?: string
  }): Promise<BadgeResponse[]> {
    try {
        let badgesResponse : BadgeResponse[] = [];

        // programmatic badges
        if (badgesSubgraphUrl) {
            const badgeQuery = `
                query( $id: String) {
                    seasonUser(id: $id) {
                        id
                        badges {
                        id
                        awardedTimestamp
                        mintedTimestamp
                        badgeType
                        }
                    }
                }
            `;
            const client = new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({ uri: badgesSubgraphUrl, fetch })
            })
            const id = `${userId.toLowerCase()}#${seasonId}`
            const data = await client.query<{
                seasonUser: {
                    badges: SubgraphBadgeResponse[]
                }
            }>({
                query: gql(badgeQuery),
                variables: {
                    id: id,
                },
            });

            const subgraphBadges = (data?.data?.seasonUser ? data.data.seasonUser.badges : []) as SubgraphBadgeResponse[];
            for (const badge of subgraphBadges) {
                if (parseInt(badge.awardedTimestamp) > 0 || parseInt(badge.mintedTimestamp) > 0) {
                    badgesResponse.push({
                        id: badge.id,
                        badgeType: badge.badgeType,
                        awardedTimestampMs: toMillis(parseInt(badge.awardedTimestamp)),
                        mintedTimestampMs: toMillis(parseInt(badge.mintedTimestamp)),
                    });
                }
            }
        }
        
        return badgesResponse;
    } catch (error) {
        sentryTracker.captureException(error);
        return [];
    }
}