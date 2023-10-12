import { FField } from "../field";
import { FFieldType, FObjectFieldType } from "../types";

export class FObjectField extends FField implements FObjectFieldType {
  fields: Record<string, FFieldType>;
  fieldsets?: { value: string; title: string }[];
  groups?: { value: string; title: string }[];

  constructor(config: Omit<FObjectFieldType, "type">) {
    super({ ...config, type: "object" });
    this.fields = config.fields;
    this.fieldsets = config.fieldsets;
    this.groups = config.groups;

    // Making itself there parent
    Object.values(this.fields).forEach((item) => (item.parent = this));
  }

  static create(config: Omit<FObjectFieldType, "type">) {
    return new FObjectField(config);
  }
}
