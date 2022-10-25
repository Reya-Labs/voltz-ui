/**
 * It returns true if the rateOracleProtocolId is 5 or 6, and false otherwise
 * @param {number} rateOracleProtocolId - The ID of the rate oracle protocol.
 * @returns A boolean value.
 */
const isBorrowing = (rateOracleProtocolId: number): boolean => {
  const borrowIds = [5, 6];
  return borrowIds.includes(rateOracleProtocolId);
};

export default isBorrowing;
