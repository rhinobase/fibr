import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ThreadWithIdType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Button, classNames } from "@rafty/ui";
import { CSSProperties } from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";

export type OverviewCard = ThreadWithIdType & {
  selectBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  currentBlock: string | null;
};

export function OverviewCard({
  id,
  type,
  selectBlock,
  removeBlock,
  currentBlock,
}: OverviewCard) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNodeSelect = eventHandler(() => selectBlock(id));

  const handleNodeDelete = eventHandler(() => removeBlock(id));

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow hover:drop-shadow-md",
        !isDragging && "transition-all ease-in-out",
        currentBlock === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={handleNodeSelect}
      onKeyDown={handleNodeSelect}
    >
      {/*Drag Handler Button */}
      <Button
        {...attributes}
        {...listeners}
        variant="ghost"
        size="icon"
        className={classNames(
          "rounded px-0.5 py-1",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <MdDragIndicator className="text-black" />
      </Button>
      <p className="text-2xs truncate font-medium capitalize">
        {id} ({type})
      </p>
      <div className="flex-1" />
      {/* Delete Button */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded p-0.5"
        onClick={handleNodeDelete}
        onKeyDown={handleNodeDelete}
      >
        <MdDelete />
      </Button>
    </div>
  );
}
