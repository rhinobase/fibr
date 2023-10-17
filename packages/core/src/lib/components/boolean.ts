import { FField } from "../field";
import { FBooleanFieldType, FBooleanOptions } from "../types";

export class FBooleanField extends FField implements FBooleanFieldType {
  options?: FBooleanOptions;

  constructor(config: Omit<FBooleanFieldType, "type"> = {}) {
    super({ ...config, type: "boolean" });

    if (config.options)
      this.options = {
        layout: config.options.layout ?? "checkbox",
      };
  }

  static create(config: Omit<FBooleanFieldType, "type">) {
    return new FBooleanField(config);
  }
}
