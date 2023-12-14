import { FField } from "./field";
import { FForm } from "./form";
import {
  FArrayOptions,
  FBooleanOptions,
  FDateOptions,
  FDateTimeOptions,
  FFieldType,
  FObjectOptions,
  FSharedOptions,
  FTextOptions,
} from "./types";

function _creator<T extends Record<string, unknown>>(
  type: string,
  defaults?: Partial<T>,
) {
  return (config: Omit<FFieldType<T>, "type">) =>
    FField.create({ type, defaults, ...config });
}

export const f = {
  form: FForm.create,
  custom: FField.create,
  array: _creator<FArrayOptions>("array", { sortable: false }),
  boolean: _creator<FBooleanOptions>("boolean", { layout: "checkbox" }),
  date: _creator<FDateOptions>("date"),
  datetime: _creator<FDateTimeOptions>("datetime", { timeStep: 15 }),
  number: _creator<FSharedOptions<number>>("number", {
    layout: "select",
    direction: "vertical",
  }),
  object: _creator<FObjectOptions>("object"),
  string: _creator<FSharedOptions<string>>("string", {
    layout: "select",
    direction: "vertical",
  }),
  text: _creator<FTextOptions>("text"),
};
