import { SidebarItem } from "@fibr/builder";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { SearchField } from "@rafty/ui";
import { PaletteCard } from "../../components";
import { useSource } from "../../providers";

export function Palette() {
  const { blocks } = useSource();

  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon className="h-5 w-5 stroke-2" />}
      className="space-y-3 overflow-y-auto data-[orientation=vertical]:p-3"
    >
      <SearchField size="sm" />
      <div className="grid w-full grid-cols-3 gap-2.5">
        {blocks.map((block) => (
          <PaletteCard key={block.type} {...block} />
        ))}
      </div>
    </SidebarItem>
  );
}
