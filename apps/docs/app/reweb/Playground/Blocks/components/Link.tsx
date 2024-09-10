import { useCanvas } from "@fibr/builder";
import { Thread, type ThreadType, useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import type { HTMLAttributes } from "react";
import { Wrapper } from "./Wrapper";

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

  const handleSelect = eventHandler(() =>
    select({
      selectedBlockIds: id,
    }),
  );

  return (
    <Wrapper
      as="a"
      isSelected={selectedBlock?.selected ?? false}
      id={id}
      href={link}
      className={className?.join(" ")}
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      {blocks &&
        Object.entries(blocks).map(([id, field]) => (
          <Thread key={id} id={id} {...field} />
        ))}
    </Wrapper>
  );
}
