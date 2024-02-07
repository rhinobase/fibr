import { SidebarItem } from "@fibr/builder";
import { SearchField } from "@rafty/ui";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { PaletteCard } from "./PaletteCard";
import { useSource } from "../../providers";
import { Empty } from "../utils";
import { useMemo, useState } from "react";
import Fuse, { type RangeTuple } from "fuse.js";
import { Block } from "../../types";

export type Palette = {
  isDisabled?: boolean;
  onBlockSelect: PaletteCard["onSelect"];
};

export function Palette({ isDisabled = false, onBlockSelect }: Palette) {
  const blocks = useSource((state) => state.blocks);
  const [search, setSearch] = useState<string>();

  const fuse = useMemo(() => {
    const data = Object.entries(blocks).flatMap(([category, blocks]) =>
      blocks.map((block) => ({ category, ...block })),
    );

    return new Fuse(data, {
      keys: ["type", "label"],
      includeMatches: true,
    });
  }, [blocks]);

  let blockResults = blocks;

  if (search) {
    const init = Object.keys(blocks).reduce<Record<string, Block[]>>(
      (prev, cur) => {
        prev[cur] = [];
        return prev;
      },
      {},
    );
    blockResults = fuse
      .search(search)
      .reduce<
        Record<string, (Block & { matches?: RangeTuple[] })[]>
      >((prev, cur) => {
        const { item, matches } = cur;

        prev[item.category].push({
          icon: item.icon,
          label: item.label,
          type: item.type,
          private: item.private,
          presets: item.presets,
          matches: matches
            ?.filter((match) => match.key === "label")
            .flatMap((match) => match.indices),
        });
        return prev;
      }, init);
  }

  return (
    <SidebarItem
      name="palette"
      label="Palette"
      icon={<Squares2X2Icon className="h-5 w-5 stroke-2" />}
      className="space-y-3 overflow-y-auto data-[orientation=vertical]:p-3"
    >
      {isDisabled ? (
        <Empty
          title="No canvas exists"
          description="Please add a canvas in order to add fields in it"
        />
      ) : (
        <>
          <SearchField onSearch={setSearch} size="sm" />
          {Object.entries(blockResults).map(
            ([category, components]) =>
              components.length > 0 && (
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
              ),
          )}
        </>
      )}
    </SidebarItem>
  );
}
