import { Divider, divider } from "./divider";
import { Form, form } from "./form";
import { Image, image } from "./image";
import { PasswordInput, password } from "./password";
import { Text, text } from "./text";
import { TextInput, stringInput } from "./text-input";
import { TextareaField, textarea } from "./textarea";

export type { Divider } from "./divider";
export type { Form } from "./form";
export type { Image } from "./image";
export type { PasswordInput } from "./password";
export type { Text } from "./text";
export type { TextInput } from "./text-input";
export type { TextareaField } from "./textarea";

export const plugin = {
  divider: Divider,
  form: Form,
  image: Image,
  password: PasswordInput,
  text: Text,
  string: TextInput,
  textarea: TextareaField,
};

export const f = {
  divider,
  form,
  image,
  password,
  text,
  string: stringInput,
  textarea,
};
