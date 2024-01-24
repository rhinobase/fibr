import { Thread, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../../providers";
import { FieldWrapper } from "./FieldWrapper";

export function FormDisplay() {
  const {
    fields: { all },
  } = useBlueprint();

  const fields = all();

  return (
    <WeaverProvider wrapper={FieldWrapper}>
      {fields.map((field) => (
        <Thread key={field.id} {...field} />
      ))}
    </WeaverProvider>
  );
}
