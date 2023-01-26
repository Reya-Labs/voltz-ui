import { getAllMellowProducts } from "@voltz-protocol/v1-sdk";

export type OptimiserInfo = Awaited<ReturnType<typeof getAllMellowProducts>>[0];
