import { FFieldType } from "./field";

export type FCustomFieldType<T> = FFieldType & {
  options?: T;
};
