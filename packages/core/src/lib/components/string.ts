import { FWithPlaceholder } from "../placeholder";
import { FStringFieldType, FStringOptions } from "../types";

export class FStringField
  extends FWithPlaceholder
  implements FStringFieldType<string>
{
  options?: FStringOptions<string>;

  constructor(config: Omit<FStringFieldType, "type">) {
    super({ ...config, type: "string" });

    if (config.options)
      this.options = {
        list: config.options.list,
        layout: config.options.layout ?? "select",
        direction: config.options.direction ?? "vertical",
      };
  }

  static create(config: Omit<FStringFieldType, "type">) {
    return new FStringField(config);
  }
}
