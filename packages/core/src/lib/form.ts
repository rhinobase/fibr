import { FFieldType, FFormType } from "./types";

export class FForm<T, U> implements FFormType<T, U> {
  name: string;
  fields: Record<keyof T, FFieldType>;
  validation: U;
  default_values?: Partial<T>;

  constructor(config: FFormType<T, U>) {
    this.name = config.name;
    this.fields = config.fields;
    this.default_values = config.default_values;
    this.validation = config.validation;
  }

  static create<T, U>(config: FFormType<T, U>) {
    return new FForm(config);
  }
}
