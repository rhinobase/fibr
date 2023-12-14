export type FSharedListType<T> = {
  label: string;
  value: T | FSharedListType<T>[];
};

export type FSharedOptions<T> = {
  list: FSharedListType<T>[];
  layout?: "multi" | "select" | "radio" | "checkbox" | "combobox";
  direction?: "horizontal" | "vertical";
  placeholder?: string;
};
