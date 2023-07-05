import { AnyAction } from '@reduxjs/toolkit';

import { admitPassVerificationFlowReducer, SliceState } from './reducer';
import { verifyAdmitPassThunk } from './thunks';

describe('admitPassVerificationFlowReducer', () => {
  it('should handle verifyAdmitPassThunk.pending', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'verify',
      status: 'idle',
      error: null,
    };

    // Create a mock action with the pending type
    const action: AnyAction = { type: verifyAdmitPassThunk.pending.type };

    // Call the reducer function with the initial state and the action
    const newState = admitPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('pending');
    expect(newState.error).toBe(null);
  });

  it('should handle verifyAdmitPassThunk.rejected', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'verify',
      status: 'pending',
      error: null,
    };

    // Create a mock action with the rejected type and a payload
    const payload = 'Error message';
    const action: AnyAction = { type: verifyAdmitPassThunk.rejected.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = admitPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('error');
    expect(newState.step).toBe('verify');
    expect(newState.error).toBe(payload);
  });

  it('should handle verifyAdmitPassThunk.fulfilled', () => {
    // Set up initial state
    const initialState: SliceState = {
      step: 'verify',
      status: 'pending',
      error: null,
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = true;
    const action: AnyAction = { type: verifyAdmitPassThunk.fulfilled.type, payload };

    // Call the reducer function with the initial state and the action
    const newState = admitPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.status).toBe('success');
    expect(newState.step).toBe('admit-pass-found');
    expect(newState.error).toBe(null);
  });
});
