export const MATURITY_WINDOW = 1 * 60 * 60 * 1000;
export const MATURITY_WINDOW_AAVE_LEND = 24 * 60 * 60 * 1000;

export const getMaturityWindow = (protocolId: number) => {
  return protocolId === 1 ? MATURITY_WINDOW_AAVE_LEND : MATURITY_WINDOW;
};
