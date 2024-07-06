import { useCanvas } from "@fibr/builder";
import { Thread, type ThreadType, useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import type { HTMLAttributes } from "react";

export type Paragraph = {
  blocks?: Record<string, ThreadType>;
  data: { className?: HTMLAttributes<HTMLDivElement>["className"][] };
};

export function Paragraph() {
  const {
    id,
    data: { className },
    blocks,
  } = useThread<Paragraph>();

  const { select, selectedBlock } = useCanvas(({ select, schema }) => ({
    select,
    selectedBlock: schema.find((block) => block.id === id),
  }));

  const isSelected = selectedBlock?.selected ?? false;

  const props = className ? { className: className.join(" ") } : {};
  const onSelect = eventHandler(() =>
    select({
      selectedBlockIds: id,
    }),
  );
  return (
    <p
      id={id}
      data-id={id}
      {...props}
      data-selected={isSelected}
      onClick={onSelect}
      onKeyDown={onSelect}
    >
      {blocks &&
        Object.entries(blocks).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
    </p>
  );
}
