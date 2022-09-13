
export type RankType = {
    address: string,
    points: number
}

export const getSortedRanking = (ranking: Map<string, number>): RankType[] => {
    const result: RankType[] = [];
    // for (let [k, v] of ranking) {
    //     result.push({address: k, points: v}
    // }
    Object.keys(ranking).forEach((address) => result.push({address: address, points: ranking.get(address) ?? 0}));
    //ranking.forEach((points, address) => result.push({address: address, points: points}));

    const sorted = result.sort((a, b) => a.points - b.points);

    return sorted;
}
