import { eventHandler } from "@rafty/shared";
import type { Block } from "../../types";

export type PaletteCard = Omit<Block, "builder"> & {
  onSelect?: (props: Pick<Block, "type" | "presets">) => void;
};

export function PaletteCard({
  type,
  label,
  icon: Icon,
  presets,
  onSelect,
}: PaletteCard) {
  const handleSelect = eventHandler(() => onSelect?.({ type, ...presets }));

  return (
    <div
      className="w-[72px] space-y-1"
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="border-secondary-300 dark:border-secondary-700 hover:border-secondary-500/80 flex h-[69px] cursor-pointer items-center justify-center rounded border transition-all ease-in-out">
        <Icon className="h-6 w-6 opacity-50" />
      </div>
      <p className="text-secondary-500 dark:text-secondary-400 text-2xs text-center capitalize leading-none">
        {label}
      </p>
    </div>
  );
}
