import { FFieldType } from "@fibr/core";

export type FieldProps<T = FFieldType> = {
  name: string;
  field: T;
};
