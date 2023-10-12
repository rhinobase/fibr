import { FFieldType } from "@fiber/core";

export type FieldProps<T = FFieldType> = {
  name: string;
  field: T;
};
