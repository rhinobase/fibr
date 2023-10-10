import { FWithPlaceholder } from "../placeholder";
import { FWithPlaceholderType } from "../types";

export type FTextOptions = {
  rows: number;
};

export type FTextFieldType = FWithPlaceholderType & {
  options?: FTextOptions;
};

class FTextField extends FWithPlaceholder implements FTextFieldType {
  options?: FTextOptions;

  constructor(config: Omit<FTextFieldType, "type">) {
    super({ ...config, type: "text" });

    this.options = config.options;
  }

  static create(config: Omit<FTextFieldType, "type">) {
    return new FTextField(config);
  }
}

export const text = FTextField.create;
