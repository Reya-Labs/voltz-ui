export type TokenConstructorArgs = {
  id: string;
  name: string;
};

class Token {
  public readonly id?: string;
  public readonly name?: string;

  public constructor({ id, name }: TokenConstructorArgs) {
    this.id = id;
    this.name = name;
  }
}

export default Token;
