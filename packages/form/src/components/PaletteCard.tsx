import { eventHandler } from "@rafty/shared";
import { useBlueprint } from "../providers";
import { Block } from "../types";

export function PaletteCard({
  type,
  label,
  icon: Icon,
}: Pick<Block, "type" | "label" | "icon">) {
  const {
    fields: { add },
  } = useBlueprint();

  const onSelect = eventHandler(() =>
    add({
      type,
    }),
  );

  return (
    <div className="space-y-1" onClick={onSelect} onKeyDown={onSelect}>
      <div className="border-secondary-300 dark:border-secondary-700 flex h-14 w-full items-center justify-center rounded border">
        <Icon className="h-6 w-6 opacity-50" />
      </div>
      <p className="text-secondary-500 dark:text-secondary-400 text-2xs text-center font-medium capitalize leading-none">
        {label}
      </p>
    </div>
  );
}
