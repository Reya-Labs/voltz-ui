import { Token } from '@voltz-protocol/v1-sdk';

export enum UnderlyingProtocol {
  COMPOUND = 'COMPOUND',
  AAVE = 'AAVE',
}

export type UnderlyingInfo = {
  protocolId: UnderlyingProtocol;
  token: Token;
};
