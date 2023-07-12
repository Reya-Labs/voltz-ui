import { AnyAction } from '@reduxjs/toolkit';

import {
  alphaPassClaimFlowReducer,
  closeClaimDialogAction,
  openClaimDialogAction,
  SliceState,
} from './reducer';
import {
  claimAlphaPassThunk,
  fetchIsAlphaPassClaimedThunk,
  getAlphaPassCountThunk,
} from './thunks';

describe('alphaPassClaimFlowReducer', () => {
  it('should handle claimAlphaPassThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: claimAlphaPassThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('pending');
    expect(newState.error).toBe(null);
  });

  it('should handle claimAlphaPassThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'pending',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the rejected type and a payload
    const payload = 'Error message';
    const action: AnyAction = { type: claimAlphaPassThunk.rejected.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('error');
    expect(newState.step).toBe('claim-dialog');
    expect(newState.error).toBe(payload);
  });

  it('should handle claimAlphaPassThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'pending',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the fulfilled type
    const action: AnyAction = { type: claimAlphaPassThunk.fulfilled.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('success');
    expect(newState.step).toBe('claimed');
    expect(newState.error).toBe(null);
  });

  it('should handle fetchIsAlphaPassClaimedThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: fetchIsAlphaPassClaimedThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('fetchingClaimStatus');
  });

  it('should handle fetchIsAlphaPassClaimedThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the rejected type
    const action: AnyAction = { type: fetchIsAlphaPassClaimedThunk.rejected.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('fetchingClaimError');
  });

  it('should handle fetchIsAlphaPassClaimedThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = true;
    const action: AnyAction = { type: fetchIsAlphaPassClaimedThunk.fulfilled.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe(payload ? 'claimed' : 'claim');
  });

  it('should handle getAlphaPassCountThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: getAlphaPassCountThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAlphaPass).toBe(null);
  });

  it('should handle getAlphaPassCountThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the rejected type
    const action: AnyAction = { type: getAlphaPassCountThunk.rejected.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAlphaPass).toBe(0);
  });

  it('should handle getAlphaPassCountThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = 10;
    const action: AnyAction = { type: getAlphaPassCountThunk.fulfilled.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.totalAlphaPass).toBe(payload);
  });

  it('should handle openClaimDialogAction', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'fetchingClaimStatus',
      status: 'idle',
      error: null,
      totalAlphaPass: null,
    };

    // Create a mock action
    const action: AnyAction = { type: openClaimDialogAction.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

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
      totalAlphaPass: null,
    };

    // Create a mock action
    const action: AnyAction = { type: closeClaimDialogAction.type };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassClaimFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toBe('claim');
    expect(newState.error).toBe('');
  });
});
