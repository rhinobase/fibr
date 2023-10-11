import { FieldWrapper, FieldsType } from "@fiber/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";

export function OverrideComponent(props: FieldsType) {
  const { name, field } = props;
  const { register, watch } = useFormContext();
  const value = watch(name, "");
  const characterCount = value.length;

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
    >
      <InputField {...register(name)} />
      <p>{characterCount > 0 && characterCount}</p>
    </FieldWrapper>
  );
}
