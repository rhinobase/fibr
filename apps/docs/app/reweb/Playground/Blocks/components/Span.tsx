import { useCanvas } from "@fibr/builder";
import { Thread, type ThreadType, useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import type { HTMLAttributes } from "react";

export type Span = {
  blocks?: Record<string, ThreadType>;
  data: { className?: HTMLAttributes<HTMLDivElement>["className"][] };
};

export function Span() {
  const {
    id,
    data: { className },
    blocks,
  } = useThread<Span>();
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
    <span
      id={id}
      {...props}
      data-id={id}
      data-selected={isSelected}
      onClick={onSelect}
      onKeyDown={onSelect}
    >
      {blocks &&
        Object.entries(blocks).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
    </span>
  );
}
