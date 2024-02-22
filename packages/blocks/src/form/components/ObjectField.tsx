import { Thread, type ThreadType, useThread } from "@fibr/react";
import { Label, Text } from "@rafty/ui";
import { Fragment, PropsWithChildren } from "react";

export type ObjectField = {
  blocks?: Record<string, ThreadType>;
  data: { label: string; description: string };
};

export function ObjectField() {
  const {
    blocks,
    data: { description, label },
  } = useThread<ObjectField>();

  const LabelAndDescriptionWrapper =
    label && description
      ? ({ children }: PropsWithChildren) => <div>{children}</div>
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
      {blocks &&
        Object.entries(blocks).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
    </div>
  );
}
