import { useBuilder } from "@fibr/builder";
import { PlusIcon } from "@heroicons/react/24/outline";
import { eventHandler } from "@rafty/shared";

export function AddFieldCard() {
  const {
    tabs: { setActive },
  } = useBuilder();

  const setPaletteActive = eventHandler(() => setActive("palette"));

  return (
    <div
      className="hover:bg-secondary-50 flex w-full cursor-pointer select-none items-center justify-center gap-4 rounded-lg border-[3px] border-dotted p-6 transition-all ease-in-out"
      onClick={setPaletteActive}
      onKeyDown={setPaletteActive}
    >
      <PlusIcon className="h-4 w-4 stroke-[3px]" />
      <p className="text-sm font-semibold leading-none">Add Field</p>
    </div>
  );
}
