import { checkLowLeverageNotification } from '.';

describe('checkLowLeverageNotification', () => {
  it('returns true when leverage is below minimum allowed and notification is not shown', () => {
    const state = {
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
    const state = {
      amm: {
        minLeverageAllowed: 3,
      },
      userInput: {
        leverage: 3,
      },
      showLowLeverageNotification: false,
    };
    expect(checkLowLeverageNotification(state as never)).toBe(false);

    state.userInput.leverage = 4;
    expect(checkLowLeverageNotification(state as never)).toBe(false);
  });

  it('returns false when notification is already shown', () => {
    const state = {
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
