import { useDraggable } from "@dnd-kit/core";
import {
  type Block,
  type BlockType,
  classNames,
  eventHandler,
} from "@fibr/builder";
import type { RangeTuple } from "fuse.js";
import { highlightMatches } from "./utils";

export type PaletteCard = Block & {
  isOverlay?: boolean;
  enableDragging?: boolean;
  onSelect?: (props: Omit<BlockType, "id">) => void;
  matches?: RangeTuple[];
};

export function PaletteCard({
  onSelect,
  matches,
  enableDragging = false,
  isOverlay = false,
  ...block
}: PaletteCard) {
  const { type, label, icon: Icon, presets } = block;

  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: `${type}-${label}`,
    data: block,
  });

  const draggableProps = enableDragging
    ? {
        ref: setNodeRef,
        ...attributes,
        ...listeners,
      }
    : { role: "button", tabIndex: 0 };

  const handleSelect = eventHandler(() => onSelect?.({ type, ...presets }));

  return (
    <div
      className={classNames("w-[72px]", !isOverlay && "space-y-1")}
      onClick={handleSelect}
      onKeyDown={handleSelect}
      {...draggableProps}
    >
      <div
        className={classNames(
          isOverlay || isDragging
            ? "cursor-grabbing"
            : enableDragging
              ? "cursor-grab"
              : "cursor-pointer",
          "border-secondary-300 dark:border-secondary-700 dark:hover:bg-secondary-800/70 hover:border-secondary-500/80 dark:bg-secondary-950 flex h-[69px] items-center justify-center rounded border bg-white transition-all ease-in-out",
        )}
      >
        <Icon className="size-6 opacity-50" />
      </div>
      {!isOverlay && (
        <p
          className={classNames(
            enableDragging && "select-none",
            "text-secondary-500 dark:text-secondary-400 text-center text-[0.75rem] capitalize",
          )}
        >
          {matches ? highlightMatches(label, matches) : label}
        </p>
      )}
    </div>
  );
}
