import { Signer } from "ethers";
import { AaveRateOracle__factory } from "../typechain";

export type RateOracleConstructorArgs = {
  id: string;
};

class RateOracle {
  public readonly id: string;

  public constructor({ id }: RateOracleConstructorArgs) {
    this.id = id;
  }

  private async _underlyingYieldBearingProtocolID(
    signer: Signer
  ): Promise<number> {
    // can use AaveRateOracle__factory (any other rate oracle factory would have worked) since we only need its abi to retrieve the ID
    const rateOracleContract = AaveRateOracle__factory.connect(this.id, signer)
    const protocolID: number = await rateOracleContract.underlyingYieldBearingProtocolID()

    return protocolID;
  }

  public async underlyingYieldBearingProtocolName(
    signer: Signer
  ): Promise<string> {
    const underlyingYieldBearingProtocolID = await this._underlyingYieldBearingProtocolID(signer)

    // == or === ?
    if (underlyingYieldBearingProtocolID == 1) {
      return "Aave V2"
    } else {
      return "UNKNOWN"
    }

  }

}

export default RateOracle;
