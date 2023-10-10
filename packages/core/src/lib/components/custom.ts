import { FField } from "../field";
import { FFieldType } from "../types";

export type FCustomFieldType<T> = FFieldType & {
  options?: T;
};

class FCustomField<T = undefined>
  extends FField
  implements FCustomFieldType<T>
{
  options?: T;

  constructor(config: FCustomFieldType<T>) {
    super(config);
    this.options = config.options;
  }

  static create<T>(config: FCustomFieldType<T>) {
    return new FCustomField(config);
  }
}

export const custom = FCustomField.create;
