export type RateOracleConstructorArgs = {
  id: string;
};

class RateOracle {
  public readonly id: string;

  public constructor({ id }: RateOracleConstructorArgs) {
    this.id = id;
  }
}

export default RateOracle;
