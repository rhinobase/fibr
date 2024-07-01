import { SidebarItem, useBlocks, type Block } from "@fibr/builder";
import { SearchField } from "@rafty/ui";
import Fuse, { type RangeTuple } from "fuse.js";
import { useMemo, useState, type ReactNode } from "react";
import { Empty } from "../utils";
import { PaletteCard } from "./PaletteCard";
import { PaletteCardOverlay } from "./PaletteCardOverlay";

export type Palette = {
  onSelect: PaletteCard["onSelect"];
  trigger: ReactNode;
} & Pick<PaletteCard, "enableDragging">;

export function Palette({
  enableDragging = false,
  onSelect,
  trigger,
}: Palette) {
  const blocks = useBlocks((state) => state.blocks);
  const [search, setSearch] = useState("");

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
  let isEmpty = false;

  if (search) {
    const init = Object.keys(blocks).reduce<Record<string, Block[]>>(
      (prev, cur) => {
        prev[cur] = [];
        return prev;
      },
      {},
    );

    const results = fuse.search(search);

    if (results.length === 0) isEmpty = true;

    blockResults = results.reduce<
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
      trigger={trigger}
      className="h-full w-full flex-col text-black data-[state=active]:flex dark:text-white"
    >
      <div className="space-y-3 p-3">
        <h4 className="font-medium">Palette</h4>
        <hr className="dark:border-secondary-700" />
      </div>
      <div className="h-full overflow-y-auto">
        <div className="flex h-full flex-col px-3 pb-3">
          <div className="dark:bg-secondary-950 sticky top-0 z-10 bg-white">
            <SearchField
              value={search}
              onValueChange={setSearch}
              size="sm"
              autoComplete="off"
            />
          </div>
          {isEmpty ? (
            <div className="flex flex-1 flex-col justify-center">
              <Empty
                title="Component Not Found"
                description="Please check your spelling and try again, or explore our other available components."
              />
            </div>
          ) : (
            Object.entries(blockResults).map(
              ([category, components]) =>
                components.length > 0 && (
                  <div key={category} className="space-y-2.5 pb-3">
                    <h3 className="text-sm font-semibold">{category}</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {components.map((block, index) => (
                        <PaletteCard
                          key={`${index}-${block.type}`}
                          {...block}
                          enableDragging={enableDragging}
                          onSelect={onSelect}
                        />
                      ))}
                    </div>
                  </div>
                ),
            )
          )}
          {enableDragging && <PaletteCardOverlay />}
        </div>
      </div>
    </SidebarItem>
  );
}
