import { FFieldType } from "./field";
import { Resolver, FieldValues } from "react-hook-form";

export type FFormType<T> = {
  fields: Record<keyof T, FFieldType>;
  validation: Resolver<FieldValues, any>;
  default_values?: Partial<T>;
};
