import { Select, SelectItem } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FStringFieldType, FStringListType } from "@fibr/core";
import { FieldProps } from "@fibr/react";

export function SelectField({ name, field }: FieldProps<FStringFieldType>) {
  const { register } = useFormContext();

  return (
    <Select
      {...register(name, { valueAsNumber: field.type === "number" })}
      isRequired={field.required as boolean | undefined}
      isReadOnly={field.readOnly as boolean}
    >
      {field.options && <Options items={field.options?.list} />}
    </Select>
  );
}

function Options({ items }: { items: FStringListType<string>[] }) {
  const components: JSX.Element[] = [];

  items.forEach(({ label, value }, index) => {
    if (typeof value == "string" || typeof value == "number")
      components.push(
        <SelectItem key={index} value={value as string}>
          {label}
        </SelectItem>
      );
    else components.push(<Options key={index} items={value} />);
  });

  return components;
}
