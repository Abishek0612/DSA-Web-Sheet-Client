export interface PayloadAction<P = void, T extends string = string> {
  type: T;
  payload: P;
}
