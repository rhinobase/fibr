import type { FieldProps } from "@duck-form/fields";
import { DuckField, useBlueprint, useDuckForm, useField } from "duck-form";
import { useId, useMemo } from "react";

export type ArrayProps = {
  type: "array";
  fields?: Record<string, FieldProps>;
  defaultValue?: unknown[] | (() => unknown[]);
};

export function ArrayField() {
  const props = useField<ArrayProps>();

  const { generateId } = useDuckForm();
  const { schema } = useBlueprint();

  const autoId = useId();
  const customId = useMemo(
    () => generateId?.(schema, props),
    [generateId, schema, props],
  );

  const componentId = customId ?? autoId;

  return (
    <div className="border-secondary-200 dark:border-secondary-800 flex flex-col gap-3 rounded-md border p-3 md:gap-4 md:p-4 lg:gap-5 lg:p-5 xl:gap-6 xl:p-6">
      {Object.entries(props.fields ?? {}).map(([fieldName, field]) => {
        const uniqueId = `${componentId}.${fieldName}`;

        return (
          <DuckField key={uniqueId} {...field} id={uniqueId} name={uniqueId} />
        );
      })}
    </div>
  );
}
