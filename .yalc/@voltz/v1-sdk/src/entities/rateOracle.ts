import mapProtocolIdToProtocol from '../utils/mapProtocolIdToProtocol';

export type RateOracleConstructorArgs = {
  id: string;
  protocolId: number;
};

class RateOracle {
  public readonly id: string;

  public readonly protocol: string;

  public constructor({ id, protocolId }: RateOracleConstructorArgs) {
    this.id = id;
    this.protocol = mapProtocolIdToProtocol(protocolId);
  }
}

export default RateOracle;
