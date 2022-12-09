import axios from 'axios';
import { LeafInfo } from '../../entities/communitySbt';
import { geLeavesIpfsUri } from './helpers';

export async function createLeaves(
    network: string,
    seasonId: number,
): Promise<Array<LeafInfo>> {

    const data = await axios.get(geLeavesIpfsUri(network, seasonId, true));

    const snaphots : Array<{
            owner: string
            badgeType: number,
            metadataURI: string
        }> = data.data.snapshot;

    const subgraphSnapshots : Array<LeafInfo> = snaphots.map((entry) => {
        return {
            account: entry.owner,
            badgeId: entry.badgeType
        }
    })

    return subgraphSnapshots;

}