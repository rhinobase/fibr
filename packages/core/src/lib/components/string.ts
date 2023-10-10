import { FWithPlaceholder } from "../placeholder";
import { FWithPlaceholderType } from "../types";

export type FStringListType<T> = {
  label: string;
  value: T | FStringListType<T>[];
};

export type FStringOptions<U> = {
  list: FStringListType<U>[];
  layout?: "multi" | "select" | "radio" | "checkbox" | "combobox";
  direction?: "horizontal" | "vertical";
};

export type FStringFieldType<U = string> = FWithPlaceholderType & {
  options?: FStringOptions<U>;
};

class FStringField
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

export const string = FStringField.create;
