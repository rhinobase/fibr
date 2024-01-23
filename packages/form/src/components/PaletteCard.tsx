import { useBlueprint } from "../providers";
import { eventHandler } from "@rafty/shared";

export type PaletteCard = {
  type: string;
  label: string;
  icon: JSX.Element;
};

export function PaletteCard({ type, label, icon }: PaletteCard) {
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
      <div className="border-secondary-300 dark:border-secondary-700 flex h-24 w-full items-center justify-center rounded border">
        {icon}
      </div>
      <p className="text-secondary-600 dark:text-secondary-400 text-center text-xs font-medium capitalize leading-none">
        {label}
      </p>
    </div>
  );
}
