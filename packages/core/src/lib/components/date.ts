import { FField } from "../field";
import { FFieldType } from "../types";

export type FDateOptions = {
  dateFormat?: string;
};

export type FDateFieldType = FFieldType & { options?: FDateOptions };

class FDateField extends FField implements FDateFieldType {
  options?: FDateOptions;

  constructor(config: Omit<FDateFieldType, "type">) {
    super({ ...config, type: "date" });

    if (config.options)
      this.options = {
        dateFormat: config.options.dateFormat ?? "",
      };
  }

  static create(config: Omit<FDateFieldType, "type">) {
    return new FDateField(config);
  }
}

export const date = FDateField.create;
