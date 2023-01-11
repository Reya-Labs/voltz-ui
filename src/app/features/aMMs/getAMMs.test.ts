import JSBI from 'jsbi';

import { client } from '../../../graphql';
import { getAMMs, QueryAMM } from './getAMMs';

jest.mock('../../../graphql', () => ({
  client: {
    query: jest.fn(),
  },
}));

const mockAMMs: QueryAMM[] = [
  {
    id: 'id1',
    marginEngine: { id: 'marginEngine1' },
    rateOracle: {
      id: 'rateOracle1',
      protocolId: 'protocol1',
      token: { id: 'token1', name: 'Token 1', decimals: 18 },
    },
    tickSpacing: '1h',
    termStartTimestamp: JSBI.BigInt(1000),
    termEndTimestamp: JSBI.BigInt(10000),
  },
  {
    id: 'id2',
    marginEngine: { id: 'marginEngine2' },
    rateOracle: {
      id: 'rateOracle2',
      protocolId: 'protocol2',
      token: { id: 'token2', name: 'Token 2', decimals: 8 },
    },
    tickSpacing: '1d',
    termStartTimestamp: JSBI.BigInt(2000),
    termEndTimestamp: JSBI.BigInt(20000),
  },
  {
    id: 'id3',
    marginEngine: { id: 'marginEngine3' },
    rateOracle: {
      id: 'rateOracle3',
      protocolId: 'protocol3',
      token: { id: 'token3', name: 'Token 3', decimals: 8 },
    },
    tickSpacing: '1d',
    termStartTimestamp: JSBI.BigInt(3000),
    termEndTimestamp: JSBI.BigInt(30000),
  },
];

describe('getAMMs', () => {
  it('should return an array of AMM objects', async () => {
    (client.query as jest.Mock).mockResolvedValue({
      data: { amms: mockAMMs },
    });
    const amms = await getAMMs();
    expect(Array.isArray(amms)).toBe(true);
    expect(amms[0]).toHaveProperty('id');
    expect(amms[0]).toHaveProperty('marginEngine');
    expect(amms[0]).toHaveProperty('rateOracle');
    expect(amms[0]).toHaveProperty('tickSpacing');
    expect(amms[0]).toHaveProperty('termStartTimestamp');
    expect(amms[0]).toHaveProperty('termEndTimestamp');
  });

  it('should return AMMs sorted by the provided sort order IDs', async () => {
    (client.query as jest.Mock).mockResolvedValue({
      data: { amms: mockAMMs },
    });
    const amms = await getAMMs(['id2', 'id1', 'id3']);
    expect(amms[0].id).toEqual('id2');
    expect(amms[1].id).toEqual('id1');
    expect(amms[2].id).toEqual('id3');
  });

  it('should return AMMs in the default order if no sort order IDs are provided', async () => {
    (client.query as jest.Mock).mockResolvedValue({
      data: { amms: mockAMMs },
    });
    const amms = await getAMMs();
    const defaultSortedAMMs = amms.slice().sort((a, b) => a.id.localeCompare(b.id));
    expect(amms).toEqual(defaultSortedAMMs);
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'Error fetching AMMs';
    (client.query as jest.Mock).mockRejectedValue(new Error(errorMessage));
    let err: Error | null = null;
    try {
      await getAMMs();
    } catch (e) {
      err = e as Error;
    } finally {
      expect(err?.message).toEqual(errorMessage);
    }
  });
});
