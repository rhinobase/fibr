import { SidebarItem } from "@fibr/builder";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { SearchField } from "@rafty/ui";
import { PaletteCard } from "../../components";
import { useSource } from "../../providers";
import { CATEGORY_LABELS, Category } from "../../utils";

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
      {Object.entries(blocks).map(([category, components]) => (
        <div key={category} className="space-y-2.5 pb-3">
          <h3 className="text-sm font-semibold">
            {CATEGORY_LABELS[Number(category) as Category]}
          </h3>
          <div className="grid grid-cols-4 gap-2.5">
            {components.map((block) => (
              <PaletteCard key={block.type} {...block} />
            ))}
          </div>
        </div>
      ))}
    </SidebarItem>
  );
}
