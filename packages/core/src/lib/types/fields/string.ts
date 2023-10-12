import { FWithPlaceholderType } from "./placeholder";

export type FStringListType<T> = {
  label: string;
  value: T | FStringListType<T>[];
};

export type FStringOptions<U> = {
  list: FStringListType<U>[];
  layout?: "multi" | "select" | "radio" | "checkbox" | "combobox";
  direction?: "horizontal" | "vertical";
};

export type FStringFieldType<U = string> = FWithPlaceholderType & {
  options?: FStringOptions<U>;
};
