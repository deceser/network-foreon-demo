export type TLiteralUnion<T extends U, U = string> =
  | T
  | (Record<never, never> & U);
