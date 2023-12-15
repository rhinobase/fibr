import { FFieldType } from "./types";
import _merge from "lodash.merge";

export class FField<T extends Record<string, unknown>>
  implements FFieldType<T>
{
  type: string;
  label?: string;
  description?: string;
  fieldset?: string;
  group?: string;
  private _hidden?: boolean | (() => boolean);
  private _readOnly?: boolean | (() => boolean);
  private _required?: boolean | (() => boolean);
  options?: T;

  constructor(config: FFieldType<T>) {
    const {
      hidden = false,
      readOnly = false,
      required = false,
      options = {},
      defaults = {},
    } = config;

    this.type = config.type;
    this.label = config.label;
    this.description = config.description;
    this._hidden = hidden;
    this._readOnly = readOnly;
    this._required = required;
    this.fieldset = config.fieldset;
    this.group = config.group;

    this.options = _merge(options, defaults) as T;
  }

  get hidden() {
    return getValue(this._hidden);
  }

  get readOnly() {
    return getValue(this._readOnly);
  }

  get required() {
    return getValue(this._required);
  }

  toJson() {
    // TODO: Need to implement this!
    return { type: this.type };
  }

  static create(config: FFieldType) {
    return new FField(config);
  }
}

type Fn = (...args: unknown[]) => unknown;
function getValue<
  Provided,
  T = Provided extends Fn ? ReturnType<Provided> : Provided,
>(valueOrFn?: Provided): T | undefined {
  if (valueOrFn == undefined) return undefined;
  return typeof valueOrFn === "function" ? valueOrFn() : valueOrFn;
}
