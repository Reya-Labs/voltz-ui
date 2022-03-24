export type TokenConstructorArgs = {
  id: string;
  name: string;
  decimals: number;
};

class Token {
  public readonly id?: string;
  public readonly name?: string;
  public readonly decimals: number; // decimals used to represent token amounts

  public constructor({ id, name, decimals }: TokenConstructorArgs) {
    this.id = id;
    this.name = name;
    this.decimals = decimals;
  }
}

export default Token;
