import { SidebarItem } from "@fibr/builder";
import { SearchField } from "@rafty/ui";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { PaletteCard } from "./PaletteCard";
import { useSource } from "../../providers";

export type Palette = {
  onBlockSelect: PaletteCard["onSelect"];
};

export function Palette({ onBlockSelect }: Palette) {
  const blocks = useSource((state) => state.blocks);

  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon className="h-5 w-5 stroke-2" />}
      className="space-y-3 overflow-y-auto data-[orientation=vertical]:p-3"
    >
      <SearchField size="sm" />
      {Object.entries(blocks).map(([category, components]) => (
        <div key={category} className="space-y-2.5 pb-3">
          <h3 className="text-sm font-semibold">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {components.map((block, index) => (
              <PaletteCard
                key={`${index}-${block.type}`}
                {...block}
                onSelect={onBlockSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </SidebarItem>
  );
}
