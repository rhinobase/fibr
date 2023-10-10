import { FField } from "./field";
import { FWithPlaceholderType } from "./types";
import { getValue } from "./utils";

export class FWithPlaceholder extends FField implements FWithPlaceholderType {
  _placeholder?: string | (() => string);

  constructor(config: FWithPlaceholderType) {
    super(config);
    this._placeholder = config.placeholder;
  }

  get placeholder() {
    return getValue(this._placeholder);
  }
}
