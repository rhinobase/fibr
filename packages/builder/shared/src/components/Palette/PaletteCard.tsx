import { eventHandler } from "@rafty/shared";
import type { RangeTuple } from "fuse.js";
import type { Block } from "../../types";
import { highlightMatches } from "./HightlightMatches";
import { useDraggable } from "@dnd-kit/core";
import { classNames } from "@rafty/ui";

export type PaletteCard = Block & {
  isOverlay?: boolean;
  enableDragging?: boolean;
  onSelect?: (props: Pick<Block, "type" | "presets">) => void;
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
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${type}-${label}`,
    data: block,
  });

  const dragableProps = enableDragging
    ? {
        ref: setNodeRef,
        ...attributes,
        ...listeners,
      }
    : {};

  const handleSelect = eventHandler(() => onSelect?.({ type, ...presets }));

  return (
    <div
      className={classNames("w-[72px]", !isOverlay && "space-y-1")}
      onClick={handleSelect}
      onKeyDown={handleSelect}
      {...dragableProps}
    >
      <div className="border-secondary-300 dark:border-secondary-700 hover:border-secondary-500/80 flex h-[69px] cursor-pointer items-center justify-center rounded border bg-white transition-all ease-in-out">
        <Icon className="h-6 w-6 opacity-50" />
      </div>
      {!isOverlay && (
        <p className="text-secondary-500 dark:text-secondary-400 text-2xs text-center capitalize leading-none">
          {matches ? highlightMatches(label, matches) : label}
        </p>
      )}
    </div>
  );
}
