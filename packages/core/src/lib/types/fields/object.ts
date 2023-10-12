import { FFieldType } from "./field";

export type FObjectFieldType = FFieldType & {
  fields: Record<string, FFieldType>;
  fieldsets?: { value: string; title: string }[];
  groups?: { value: string; title: string }[];
};
