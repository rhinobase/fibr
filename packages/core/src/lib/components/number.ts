import { FWithPlaceholder } from "../placeholder";
import { FNumberFieldType, FStringOptions } from "../types";

export class FNumberField extends FWithPlaceholder implements FNumberFieldType {
  options?: FStringOptions<number>;

  constructor(config: Omit<FNumberFieldType, "type">) {
    super({ ...config, type: "number" });

    if (config.options)
      this.options = {
        list: config.options.list,
        layout: config.options.layout ?? "select",
        direction: config.options.direction ?? "vertical",
      };
  }

  static create(config: Omit<FNumberFieldType, "type">) {
    return new FNumberField(config);
  }
}
