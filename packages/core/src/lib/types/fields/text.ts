import { FWithPlaceholderType } from "./placeholder";

export type FTextOptions = {
  rows: number;
};

export type FTextFieldType = FWithPlaceholderType & {
  options?: FTextOptions;
};
