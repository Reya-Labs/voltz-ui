import { BadgeResponse } from "../../entities";
export declare function getSubgraphBadges({ userId, seasonId, seasonStart, seasonEnd, badgesSubgraphUrl }: {
    userId: string;
    seasonId: number;
    seasonStart: number;
    seasonEnd: number;
    badgesSubgraphUrl?: string;
}): Promise<BadgeResponse[]>;
//# sourceMappingURL=getSubgraphBadges.d.ts.map