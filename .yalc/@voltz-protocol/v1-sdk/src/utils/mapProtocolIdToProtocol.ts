const mapProtocolIdToProtocol = (protocolId: number): string => {
  if (protocolId === 1) {
    return 'AAVE V2';
  }

  if (protocolId === 2) {
    return 'COMPOUND';
  }

  return 'AAVE V2';
};

export default mapProtocolIdToProtocol;
