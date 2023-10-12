import { FFieldType } from "./field";

export type FArrayOptions = {
  sortable?: boolean;
};

export type FArrayFieldType = FFieldType & {
  of: FFieldType;
  options?: FArrayOptions;
};
