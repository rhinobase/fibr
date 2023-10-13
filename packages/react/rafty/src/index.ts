import { FieldProps } from "@fibr/react";
import {
  CommonField,
  TextField,
  DateField,
  DatetimeField,
  BooleanFields,
  ArrayFields,
  ObjectField,
} from "./components";

export { FieldWrapper } from "./components";
export default {
  string: CommonField,
  number: CommonField,
  boolean: BooleanFields,
  array: ArrayFields,
  text: TextField,
  date: DateField,
  datetime: DatetimeField,
  object: ObjectField,
} as Record<string, (props: FieldProps<any>) => JSX.Element>;
