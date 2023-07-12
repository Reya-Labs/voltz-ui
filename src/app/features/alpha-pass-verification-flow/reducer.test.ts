import { AnyAction } from '@reduxjs/toolkit';

import { alphaPassVerificationFlowReducer, SliceState } from './reducer';
import { verifyAlphaPassThunk } from './thunks';

describe('alphaPassVerificationFlowReducer', () => {
  it('should handle verifyAlphaPassThunk.pending', () => {
    // Set up initial state
    const account = 'fake-account';
    const initialState: SliceState = {
      step: { [account]: 'idle' },
      error: { [account]: null },
    };

    // Create a mock action with the pending type
    const action: AnyAction = {
      meta: { arg: { account } },
      type: verifyAlphaPassThunk.pending.type,
    };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toEqual({ [account]: 'verifying' });
    expect(newState.error).toEqual({ [account]: null });
  });

  it('should handle verifyAlphaPassThunk.rejected', () => {
    // Set up initial state
    const account = 'fake-account';
    const initialState: SliceState = {
      step: { [account]: 'idle' },
      error: { [account]: null },
    };

    // Create a mock action with the rejected type and a payload
    const payload = 'Error message';
    const action: AnyAction = {
      type: verifyAlphaPassThunk.rejected.type,
      meta: { arg: { account } },
      payload,
    };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toEqual({ [account]: 'verification-error' });
    expect(newState.error).toEqual({ [account]: payload });
  });

  it('should handle verifyAlphaPassThunk.fulfilled', () => {
    // Set up initial state
    const account = 'fake-account';
    const initialState: SliceState = {
      step: { [account]: 'idle' },
      error: { [account]: null },
    };

    // Create a mock action with the fulfilled type and a payload
    const payload = true;
    const action: AnyAction = {
      type: verifyAlphaPassThunk.fulfilled.type,
      payload,
      meta: { arg: { account } },
    };

    // Call the reducer function with the initial state and the action
    const newState = alphaPassVerificationFlowReducer(initialState, action);

    // Assert the expected changes in the state
    expect(newState.step).toEqual({ [account]: 'verified' });
    expect(newState.error).toEqual({ [account]: null });
  });
});
