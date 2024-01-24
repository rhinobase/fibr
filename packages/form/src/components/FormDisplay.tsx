import { Thread, WeaverProvider } from "@fibr/react";
import { useBlueprint } from "../providers";
import { PropsWithChildren } from "react";

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

function FieldWrapper({ children }: PropsWithChildren) {
  return <div className="h-[200px]">{children}</div>;
}
