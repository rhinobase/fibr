import { FFieldType } from "./field";
import { FieldValues, UseFormProps } from "react-hook-form";

type DeepPartial<T> = T extends FFieldType
  ? T
  : {
      [K in keyof T]?: DeepPartial<T[K]>;
    };

export type Blueprint<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> = { blueprint: DeepPartial<TFieldValues> } & UseFormProps<
  TFieldValues,
  TContext
>;
