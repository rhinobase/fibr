import { FStringFieldType } from "@fiber/core";
import { FieldWrapper } from "../FieldWrapper";
import { CheckboxField } from "./CheckboxField";
import { MultiSelectField } from "./MultiSelectField";
import { ComboboxField } from "./ComboboxField";
import { RadioField } from "./RadioField";
import { SelectField } from "./SelectField";
import { InputField } from "./InputField";
import { classNames } from "@rafty/ui";
import { FieldsType } from "../../types";

const LAYOUTS = {
  checkbox: CheckboxField,
  combobox: ComboboxField,
  multi: MultiSelectField,
  radio: RadioField,
  select: SelectField,
} as const;

export function CommonField({ name, field }: FieldsType<FStringFieldType>) {
  let Component = InputField;
  const required = field.required as boolean | undefined;
  if (field.options?.layout) Component = LAYOUTS[field.options.layout];

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
      className={classNames(field.hidden ? "hidden" : "flex")}
      required={required}
    >
      <Component name={name} field={field} />
    </FieldWrapper>
  );
}
