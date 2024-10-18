import { Label, Text } from "@rafty/ui";
import { DuckField, useField } from "duck-form";
import { Fragment, type PropsWithChildren } from "react";

export type ObjectField = {
  fields?: Record<string, Record<string, unknown>>;
  data: { label: string; description: string };
};

export function ObjectField() {
  const {
    fields,
    data: { description, label },
  } = useField<ObjectField>();

  const LabelAndDescriptionWrapper =
    label && description
      ? (props: PropsWithChildren) => <div {...props} />
      : Fragment;

  return (
    <div className="border-secondary-300 dark:border-secondary-800 space-y-3 rounded border-2 border-dashed p-4">
      <LabelAndDescriptionWrapper>
        {label && <Label className="leading-3">{label}</Label>}
        {description && (
          <Text className="text-secondary-600 dark:text-secondary-400 text-xs font-medium leading-[10px]">
            {description}
          </Text>
        )}
      </LabelAndDescriptionWrapper>
      {fields &&
        Object.entries(fields).map(([id, field]) => (
          <DuckField key={id} id={id} {...field} />
        ))}
    </div>
  );
}
