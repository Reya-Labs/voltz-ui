import { Draft } from '@reduxjs/toolkit';

import { SliceState } from '../../reducer';
import { checkLowLeverageNotification } from './index';

describe('checkLowLeverageNotification', () => {
  it('returns true when leverage is below minimum allowed and notification is not shown', () => {
    const state: Draft<SliceState> = {
      amm: {
        // mock the amm object
        minLeverageAllowed: 3,
      },
      userInput: {
        leverage: 2,
      },
      showLowLeverageNotification: false,
    } as never;
    expect(checkLowLeverageNotification(state)).toBe(true);
  });

  it('returns false when leverage is above or equal to minimum allowed', () => {
    const state: Draft<SliceState> = {
      amm: {
        minLeverageAllowed: 3,
      },
      userInput: {
        leverage: 3,
      },
      showLowLeverageNotification: false,
    } as never;
    expect(checkLowLeverageNotification(state)).toBe(false);

    state.userInput.leverage = 4;
    expect(checkLowLeverageNotification(state)).toBe(false);
  });

  it('returns false when notification is already shown', () => {
    const state: Draft<SliceState> = {
      amm: {
        minLeverageAllowed: 3,
      },
      userInput: {
        leverage: 2,
      },
      showLowLeverageNotification: true,
    } as never;
    expect(checkLowLeverageNotification(state)).toBe(false);
  });
});
