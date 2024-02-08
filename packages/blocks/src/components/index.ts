import { Form, form } from "./form";
import { NumberInput, number } from "./number-input";
import { PasswordInput, password } from "./password";
import { StringInput, string } from "./string-input";
import { TextareaField, textarea } from "./textarea";

export type { Form } from "./form";
export type { NumberInput } from "./number-input";
export type { PasswordInput } from "./password";
export type { StringInput } from "./string-input";
export type { TextareaField } from "./textarea";

export const plugin = {
  form: Form,
  number: NumberInput,
  password: PasswordInput,
  string: StringInput,
  textarea: TextareaField,
};

export const f = {
  form,
  number,
  password,
  string,
  textarea,
};
