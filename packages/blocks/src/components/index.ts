import { Form, form } from "./form";
import { NumberInput, number } from "./number-input";
import { PasswordInput, password } from "./password";
import { StringInput, string } from "./string-input";
import { TextareaField, textarea } from "./textarea";
import { Page, page } from "./page";

export const plugin = {
  form: Form,
  number: NumberInput,
  password: PasswordInput,
  string: StringInput,
  textarea: TextareaField,
  page: Page,
};

export const f = {
  form,
  number,
  password,
  string,
  textarea,
  page,
};
