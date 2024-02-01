import { eventHandler } from "@rafty/shared";
import { useBlueprint } from "../providers";
import { Block } from "../types";

export function PaletteCard({
  type,
  label,
  icon: Icon,
  presets,
}: Pick<Block, "type" | "label" | "icon" | "presets">) {
  const {
    fields: { add },
    active,
  } = useBlueprint();

  const formId = active.form;

  if (!formId) throw new Error("Unable to find an active form!");

  const onSelect = eventHandler(() =>
    add(formId, {
      type,
      ...presets,
    }),
  );

  return (
    <div className="w-[70px] space-y-1" onClick={onSelect} onKeyDown={onSelect}>
      <div className="border-secondary-300 dark:border-secondary-700 hover:border-secondary-500/80 flex h-[70px] cursor-pointer items-center justify-center rounded border transition-all ease-in-out">
        <Icon className="h-6 w-6 opacity-50" />
      </div>
      <p className="text-secondary-500 dark:text-secondary-400 text-2xs text-center capitalize leading-none">
        {label}
      </p>
    </div>
  );
}
