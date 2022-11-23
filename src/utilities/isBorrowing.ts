/**
 * It returns true if the rateOracleProtocolId is 5 or 6, and false otherwise
 * @param {number} rateOracleProtocolId - The ID of the rate oracle protocol.
 * @returns A boolean value.
 */
const isBorrowing = (rateOracleProtocolId: number): boolean => {
  return rateOracleProtocolId === 5 || rateOracleProtocolId === 6;
};

export default isBorrowing;
