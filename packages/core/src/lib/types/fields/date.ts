import { FFieldType } from "./field";

export type FDateOptions = {
  dateFormat?: string;
};

export type FDateFieldType = FFieldType & { options?: FDateOptions };
