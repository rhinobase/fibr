import { FFieldType } from "./field";

export type FBooleanOptions = {
  layout?: "checkbox" | "switch";
};

export type FBooleanFieldType = FFieldType & { options?: FBooleanOptions };
