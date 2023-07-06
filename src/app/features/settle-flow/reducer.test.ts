import { closeSettleFlowAction, initializeSettleFlowAction, settleFlowReducer } from './reducer';
import { initialState } from './state';
import { confirmSettleThunk, getInfoPostSettlePositionThunk } from './thunks';

describe('settleFlowReducer', () => {
  it('should return the initial state', () => {
    expect(settleFlowReducer(undefined, {} as never)).toEqual(initialState);
  });

  it('should handle initializeSettleFlowAction', () => {
    const position = {
      id: 2,
    } as never;
    const account = '0x123456789';
    const nextState = settleFlowReducer(
      initialState,
      initializeSettleFlowAction({ position, account }),
    );

    expect(nextState.position).toEqual(position);
    expect(nextState.step).toEqual('confirmation');
    expect(nextState.error).toBeNull();
    expect(nextState.txHash).toBeNull();
  });

  it('should handle closeSettleFlowAction', () => {
    const currentState = {
      txHash: 'null',
    };
    const nextState = settleFlowReducer(currentState as never, closeSettleFlowAction());

    expect(nextState).toEqual(initialState);
  });

  it('should handle confirmSettleThunk.pending', () => {
    const nextState = settleFlowReducer(initialState, {
      type: confirmSettleThunk.pending,
    });

    expect(nextState.step).toEqual('waitingForConfirmation');
    expect(nextState.error).toBeNull();
    expect(nextState.txHash).toBeNull();
  });

  it('should handle confirmSettleThunk.rejected', () => {
    const payload = 'An error occurred.';
    const nextState = settleFlowReducer(initialState, {
      type: confirmSettleThunk.rejected,
      payload,
    });

    expect(nextState.step).toEqual('confirmation');
    expect(nextState.error).toEqual(payload);
    expect(nextState.txHash).toBeNull();
  });

  it('should handle confirmSettleThunk.fulfilled', () => {
    const transactionHash = '0xabcdef123456';
    const nextState = settleFlowReducer(initialState, {
      type: confirmSettleThunk.fulfilled,
      payload: { transactionHash },
    });

    expect(nextState.step).toEqual('completed');
    expect(nextState.error).toBeNull();
    expect(nextState.txHash).toEqual(transactionHash);
  });

  it('should handle getInfoPostSettlePositionThunk.pending', () => {
    const nextState = settleFlowReducer(initialState, {
      type: getInfoPostSettlePositionThunk.pending,
    });

    expect(nextState.infoPostSettlePosition.status).toEqual('pending');
  });

  it('should handle getInfoPostSettlePositionThunk.rejected', () => {
    const nextState = settleFlowReducer(initialState, {
      type: getInfoPostSettlePositionThunk.rejected,
    });

    expect(nextState.infoPostSettlePosition.status).toEqual('error');
  });

  it('should handle getInfoPostSettlePositionThunk.fulfilled', () => {
    const payload = { gasFee: { value: 10, token: 'ETH' } };
    const nextState = settleFlowReducer(initialState, {
      type: getInfoPostSettlePositionThunk.fulfilled,
      payload,
    });

    expect(nextState.infoPostSettlePosition.status).toEqual('success');
    expect(nextState.infoPostSettlePosition.value).toEqual(payload);
  });
});
