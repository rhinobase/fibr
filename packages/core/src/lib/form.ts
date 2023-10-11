import { FFieldType, FFormType } from "./types";
import type { Resolver, FieldValues } from "react-hook-form";

export class FForm<T> implements FFormType<T> {
  fields: Record<keyof T, FFieldType>;
  validation: Resolver<FieldValues, any>;
  default_values?: Partial<T>;

  constructor(config: FFormType<T>) {
    this.fields = config.fields;
    this.default_values = config.default_values;
    this.validation = config.validation;
  }

  static create<T>(config: FFormType<T>) {
    return new FForm(config);
  }
}

export const form = FForm.create;
