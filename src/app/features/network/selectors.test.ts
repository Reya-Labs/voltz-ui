import { RootState } from '../../store';
import { selectChainChangeState, selectChainId, selectIsSupportedChain } from './selectors';

describe('networkSelectors', () => {
  let state: RootState;

  beforeEach(() => {
    state = {
      network: {
        chainId: 1,
        isSupportedChain: true,
        chainChangeState: 'idle',
      },
    } as never;
  });

  it('should select the chainId from state', () => {
    const expectedChainId = 1;
    const result = selectChainId(state);
    expect(result).toEqual(expectedChainId);
  });

  it('should select the isSupportedChain from state', () => {
    const expectedIsSupportedChain = true;
    const result = selectIsSupportedChain(state);
    expect(result).toEqual(expectedIsSupportedChain);
  });

  it('should select the chainChangeState from state', () => {
    const expectedChainChangeState = 'idle';
    const result = selectChainChangeState(state);
    expect(result).toEqual(expectedChainChangeState);
  });
});
