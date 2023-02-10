import { getAllMellowProductsV1 } from '@voltz-protocol/v1-sdk';

export type OptimiserInfo = Awaited<ReturnType<typeof getAllMellowProductsV1>>[0];
