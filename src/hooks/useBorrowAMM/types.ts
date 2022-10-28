import { Token } from '@voltz-protocol/v1-sdk/dist/types/entities';

export enum UnderlyingProtocol {
  COMPOUND = 'COMPOUND',
  AAVE = 'AAVE',
}

export type UnderlyingInfo = {
  protocolId: UnderlyingProtocol;
  token: Token;
};
