import { FWithPlaceholder } from "../placeholder";
import { FTextFieldType, FTextOptions } from "../types";

export class FTextField extends FWithPlaceholder implements FTextFieldType {
  options?: FTextOptions;

  constructor(config: Omit<FTextFieldType, "type">) {
    super({ ...config, type: "text" });

    this.options = config.options;
  }

  static create(config: Omit<FTextFieldType, "type">) {
    return new FTextField(config);
  }
}
