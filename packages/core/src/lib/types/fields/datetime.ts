import { FFieldType } from "./field";

export type FDateTimeOptions = {
  dateFormat?: string;
  timeFormat?: string;
  timeStep?: number;
};

export type FDateTimeFieldType = FFieldType & { options?: FDateTimeOptions };
