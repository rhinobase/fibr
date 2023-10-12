import { FField } from "../field";
import { FCustomFieldType } from "../types";

export class FCustomField<T = undefined>
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
