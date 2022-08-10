

const isBorrowing = (rateOracleProtocolId: number): boolean => {
    const borrowIds = [5, 6];
    if (borrowIds.includes(rateOracleProtocolId)) {
      return true;
    }
    return false;
}

export default isBorrowing;