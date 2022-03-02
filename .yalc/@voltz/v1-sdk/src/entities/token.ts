import invariant from 'tiny-invariant'
import { validateAndParseAddress } from '../utils/validateAndParseAddress'


/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
 export class Token {

    /**
     * The decimals used in representing currency amounts
     */
    public readonly decimals: number

    /**
     * The symbol of the currency, i.e. a short textual non-unique identifier
     */
    public readonly symbol?: string

    /**
     * The name of the currency, i.e. a descriptive textual non-unique identifier
     */
    public readonly name?: string
  
    /**
     * The contract address on the chain on which this token lives
     */
    public readonly address: string
  
    public constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
        invariant(Number.isSafeInteger(chainId), 'CHAIN_ID')
        invariant(decimals >= 0 && decimals < 255 && Number.isInteger(decimals), 'DECIMALS')
        this.decimals = decimals
        this.symbol = symbol
        this.name = name

      this.address = validateAndParseAddress(address)
    }
  
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same address.
     * @param other other token to compare
     */
    public equals(other: Token): boolean {
      return this.address === other.address
    }
  
    // /**
    //  * Returns true if the address of this token sorts before the address of the other token
    //  * @param other other token to compare
    //  * @throws if the tokens have the same address
    //  * @throws if the tokens are on different chains
    //  */
    // public sortsBefore(other: Token): boolean {
    //   invariant(this.address !== other.address, 'ADDRESSES')
    //   return this.address.toLowerCase() < other.address.toLowerCase()
    // }

  }


