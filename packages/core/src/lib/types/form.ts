import { FFieldType } from "./field";

export type FFormType<T, U> = {
  fields: Record<keyof T, FFieldType>;
  validation: U;
  default_values?: Partial<T>;
};
