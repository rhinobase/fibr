import { useCanvas } from "@fibr/builder";
import { Thread, type ThreadType, useThread } from "@fibr/react";
import { eventHandler } from "@rafty/ui";
import type { HTMLAttributes } from "react";
import { Wrapper } from "./Wrapper";

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

  const handleSelect = eventHandler(() =>
    select({
      selectedBlockIds: id,
    }),
  );

  return (
    <Wrapper
      as="span"
      id={id}
      isSelected={selectedBlock?.selected ?? false}
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
