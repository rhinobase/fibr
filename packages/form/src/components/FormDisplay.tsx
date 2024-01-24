import { Thread, WeaverProvider, useThread } from "@fibr/react";
import { useBlueprint } from "../providers";
import { PropsWithChildren } from "react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";

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
  const { id } = useThread();
  const {
    fields: { select, selected },
  } = useBlueprint();

  const selectField = eventHandler(() => select(id));

  return (
    <div
      className={classNames(
        "w-full select-none rounded-md border p-5 text-center",
        selected === id ? "border-primary-500" : "border-secondary-200",
      )}
      onClick={selectField}
      onKeyDown={selectField}
    >
      {children}
    </div>
  );
}
