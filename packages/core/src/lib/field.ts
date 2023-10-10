import { FFieldType } from "./types";
import { getValue } from "./utils";

export class FField implements FFieldType {
  type: string;
  label?: string;
  description?: string;
  fieldset?: string;
  group?: string;
  parent?: FFieldType;
  private _hidden?: boolean | (() => boolean);
  private _readOnly?: boolean | (() => boolean);
  private _required?: boolean | (() => boolean);

  constructor(config: FFieldType) {
    this.type = config.type;
    this.label = config.label;
    this.description = config.description;
    this._hidden = config.hidden ?? false;
    this._readOnly = config.readOnly ?? false;
    this._required = config.required ?? false;
    this.fieldset = config.fieldset;
    this.group = config.group;
    this.parent = config.parent;
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

  toString() {
    return `FField - ${this.type}`;
  }

  toJSON() {
    return JSON.stringify({
      type: this.type,
      label: this.label,
      description: this.description,
      hidden: this.hidden,
      readOnly: this.readOnly,
    });
  }
}
