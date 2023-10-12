import { FField } from "../field";
import { FDateFieldType, FDateOptions } from "../types";

export class FDateField extends FField implements FDateFieldType {
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
