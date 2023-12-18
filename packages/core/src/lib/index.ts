export * from "./types";

import { FField } from "./field";
import { FForm } from "./form";

export const f = {
  form: FForm.create,
  field: FField.create,
};
