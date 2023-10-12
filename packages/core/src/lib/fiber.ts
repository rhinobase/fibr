import {
  FArrayField,
  FBooleanField,
  FCustomField,
  FDateField,
  FDateTimeField,
  FNumberField,
  FObjectField,
  FStringField,
  FTextField,
} from "./components";
import { FForm } from "./form";

export const f = {
  form: FForm.create,
  array: FArrayField.create,
  boolean: FBooleanField.create,
  custom: FCustomField.create,
  date: FDateField.create,
  datetime: FDateTimeField.create,
  number: FNumberField.create,
  object: FObjectField.create,
  string: FStringField.create,
  text: FTextField.create,
};
