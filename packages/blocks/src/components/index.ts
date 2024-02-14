import { Form } from "./form";
import { NumberInput } from "./number-input";
import { Page } from "./page";
import { PasswordInput } from "./password";
import { StringInput } from "./string-input";
import { TextareaField } from "./textarea";

export const plugin = {
  form: Form,
  number: NumberInput,
  password: PasswordInput,
  string: StringInput,
  textarea: TextareaField,
  page: Page,
};
