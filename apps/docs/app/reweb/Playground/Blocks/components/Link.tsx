import { useCanvas } from "@fibr/builder";
import { Thread, type ThreadType, useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import type { HTMLAttributes } from "react";

export type Link = {
  blocks?: Record<string, ThreadType>;
  data: {
    className?: HTMLAttributes<HTMLDivElement>["className"][];
    link?: string;
  };
};

export function Link() {
  const {
    id,
    blocks,
    data: { className, link },
  } = useThread<Link>();
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
    <a
      id={id}
      href={link}
      data-id={id}
      data-selected={isSelected}
      {...props}
      onClick={onSelect}
      onKeyDown={onSelect}
    >
      {blocks &&
        Object.entries(blocks).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
    </a>
  );
}
