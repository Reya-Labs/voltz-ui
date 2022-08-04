const mapProtocolIdToProtocol = (protocolId: number): string => {
  if (protocolId === 1) {
    return 'AAVE V2';
  }

  if (protocolId === 2) {
    return 'COMPOUND';
  }

  if (protocolId === 3) {
    return 'LIDO';
  }

  if (protocolId === 4) {
    return 'ROCKET';
  }

  if (protocolId === 5) {
    return 'AAVE V2';
  }

  if (protocolId === 6) {
    return 'COMPOUND';
  }

  throw new Error('Unrecognized protocol');
};

export default mapProtocolIdToProtocol;
