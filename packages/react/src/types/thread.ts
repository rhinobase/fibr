export type ThreadType<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  type: string;
} & T;

export type ThreadWithIdType<T extends Record<string, unknown>> = {
  id: string;
} & ThreadType<T>;
