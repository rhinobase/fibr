import { FField } from "../field";
import { FFieldType, FArrayFieldType, FArrayOptions } from "../types";

export class FArrayField extends FField implements FArrayFieldType {
  of: FFieldType;
  options?: FArrayOptions;

  constructor(config: Omit<FArrayFieldType, "type">) {
    super({ ...config, type: "array" });
    this.of = config.of;

    // Making itself it's parent
    this.of.parent = this;

    if (config.options)
      this.options = {
        sortable: config.options.sortable ?? false,
      };
  }

  static create(config: Omit<FArrayFieldType, "type">) {
    return new FArrayField(config);
  }
}
