import { RadioGroup, RadioGroupItem, Text } from "@rafty/ui";
import { Controller, useFormContext } from "react-hook-form";
import { FStringFieldType, FStringListType } from "@fibr/core";
import { FieldProps } from "@fibr/react";

export function RadioField({ name, field }: FieldProps<FStringFieldType>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...register } }) => (
        <RadioGroup
          {...register}
          onValueChange={onChange}
          required={field.required as boolean | undefined}
          isDisabled={field.readOnly as boolean | undefined}
        >
          {field.options && <Options items={field.options.list} />}
        </RadioGroup>
      )}
    />
  );
}

function Options({ items }: { items: FStringListType<string>[] }) {
  const components: JSX.Element[] = [];

  items.forEach(({ label, value }, index) => {
    if (typeof value == "string" || typeof value == "number")
      components.push(
        <RadioGroupItem key={index} value={value as string} id={label}>
          {label}
        </RadioGroupItem>
      );
    else
      components.push(
        <div key={index} className="space-y-1">
          <Text className="text-sm font-medium opacity-70">{label}</Text>
          <Options items={value} />
        </div>
      );
  });

  return <div className="space-y-2">{components}</div>;
}
