import { useBuilder } from "@fibr/builder";
import { PlusIcon } from "@heroicons/react/24/outline";
import { eventHandler } from "@rafty/shared";
import { useBlueprint } from "../providers";

export function AddFieldCard() {
  const {
    tabs: { setActive },
  } = useBuilder();

  const {
    blocks: { select },
  } = useBlueprint();

  const setPaletteActive = eventHandler(() => {
    setActive("palette");
    select(null);
  });

  return (
    <div
      className="hover:bg-secondary-50 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-lg border-[3px] border-dotted p-6 transition-all ease-in-out"
      onClick={setPaletteActive}
      onKeyDown={setPaletteActive}
    >
      <PlusIcon className="size-4 stroke-[3]" />
      <p className="text-sm font-semibold leading-none">Add Field</p>
    </div>
  );
}
