import { FFieldType } from "./field";

export type FWithPlaceholderType = FFieldType & {
  placeholder?: string | (() => string);
};
