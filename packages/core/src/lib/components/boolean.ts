import { FField } from "../field";
import { FFieldType } from "../types";

type FBooleanOptions = {
  layout?: "checkbox" | "switch";
};

export type FBooleanFieldType = FFieldType & { options?: FBooleanOptions };

class FBooleanField extends FField implements FBooleanFieldType {
  options?: FBooleanOptions;

  constructor(config: Omit<FBooleanFieldType, "type">) {
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

export const boolean = FBooleanField.create;
