import { AnyAction } from '@reduxjs/toolkit';

import {
  admitPassClaimFlowReducer,
  closeClaimDialogAction,
  openClaimDialogAction,
  SliceState,
} from './reducer';
import {
  claimAdmitPassThunk,
  fetchIsAdmitPassClaimedThunk,
  getAdmitPassCountThunk,
} from './thunks';

describe('admitPassClaimFlowReducer', () => {
  it('should handle claimAdmitPassThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: claimAdmitPassThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('pending');
    expect(newState.error).toBe(null);
  });

  it('should handle claimAdmitPassThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'pending',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the rejected type and a payload
    const payload = 'Error message';
    const action: AnyAction = { type: claimAdmitPassThunk.rejected.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('error');
    expect(newState.step).toBe('claim-dialog');
    expect(newState.error).toBe(payload);
  });

  it('should handle claimAdmitPassThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'pending',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the fulfilled type
    const action: AnyAction = { type: claimAdmitPassThunk.fulfilled.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('success');
    expect(newState.step).toBe('claimed');
    expect(newState.error).toBe(null);
  });

  it('should handle fetchIsAdmitPassClaimedThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: fetchIsAdmitPassClaimedThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('fetchingClaimStatus');
  });

  it('should handle fetchIsAdmitPassClaimedThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the rejected type
    const action: AnyAction = { type: fetchIsAdmitPassClaimedThunk.rejected.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('fetchingClaimError');
  });

  it('should handle fetchIsAdmitPassClaimedThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = true;
    const action: AnyAction = { type: fetchIsAdmitPassClaimedThunk.fulfilled.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe(payload ? 'claimed' : 'claim');
  });

  it('should handle getAdmitPassCountThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: getAdmitPassCountThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAdmitPass).toBe(null);
  });

  it('should handle getAdmitPassCountThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the rejected type
    const action: AnyAction = { type: getAdmitPassCountThunk.rejected.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAdmitPass).toBe(0);
  });

  it('should handle getAdmitPassCountThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = 10;
    const action: AnyAction = { type: getAdmitPassCountThunk.fulfilled.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAdmitPass).toBe(payload);
  });

  it('should handle openClaimDialogAction', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action
    const action: AnyAction = { type: openClaimDialogAction.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('claim-dialog');
    expect(newState.error).toBe('');
  });

  it('should handle closeClaimDialogAction', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAdmitPass: null,
    };

    // Create a mock action
    const action: AnyAction = { type: closeClaimDialogAction.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('claim');
    expect(newState.error).toBe('');
  });
});
