import { FField } from "../field";
import { FFieldType } from "../types";

export type FDateTimeOptions = {
  dateFormat?: string;
  timeFormat?: string;
  timeStep?: number;
};

export type FDateTimeFieldType = FFieldType & { options?: FDateTimeOptions };

class FDateTimeField extends FField implements FDateTimeFieldType {
  options?: FDateTimeOptions;

  constructor(config: Omit<FDateTimeFieldType, "type">) {
    super({ ...config, type: "datetime" });

    if (config.options)
      this.options = {
        dateFormat: config.options.dateFormat ?? "",
        timeFormat: config.options.timeFormat ?? "",
        timeStep: config.options.timeStep ?? 15,
      };
  }

  static create(config: Omit<FDateTimeFieldType, "type">) {
    return new FDateTimeField(config);
  }
}

export const datetime = FDateTimeField.create;
