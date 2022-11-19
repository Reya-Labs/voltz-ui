// Use this when overriding types
// https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
export type OverrideTypes<T1, T2> = Omit<T1, keyof T2> & T2;
