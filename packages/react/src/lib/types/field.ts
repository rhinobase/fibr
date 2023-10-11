import { FFieldType } from "@fiber/core";

export type FieldsType<T = FFieldType> = {
  name: string;
  field: T;
};
