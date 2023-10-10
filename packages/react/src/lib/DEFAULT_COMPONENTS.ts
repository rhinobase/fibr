import {
  CommonField,
  TextField,
  DateField,
  DatetimeField,
  BooleanFields,
  ArrayFields,
  ObjectField,
} from "./components";

export const DEFAULT_COMPONENTS = {
  string: CommonField,
  number: CommonField,
  boolean: BooleanFields,
  array: ArrayFields,
  text: TextField,
  date: DateField,
  datetime: DatetimeField,
  object: ObjectField,
};
