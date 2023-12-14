import { FFieldType } from "./field";

export type FObjectOptions = {
  fields: Record<string, FFieldType>;
  fieldsets?: { value: string; title: string }[];
  groups?: { value: string; title: string }[];
};
