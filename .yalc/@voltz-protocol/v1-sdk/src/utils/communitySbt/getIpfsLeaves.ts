import axios from 'axios';
import { LeafInfo } from '../../entities/communitySbt';
import { getLeavesIpfsUri } from './helpers';

export async function createLeaves(
  seasonId: number,
  leavesCids: Array<string>,
): Promise<Array<LeafInfo>> {
  const data = await axios.get(getLeavesIpfsUri(seasonId, leavesCids), {
    headers: {
      Accept: '*/*',
    },
  });

  const snaphots: Array<{
    owner: string;
    badgeType: number;
    metadataURI: string;
  }> = data.data.snapshot;

  const subgraphSnapshots: Array<LeafInfo> = snaphots.map((entry) => {
    return {
      account: entry.owner,
      badgeId: entry.badgeType,
    };
  });

  return subgraphSnapshots;
}
