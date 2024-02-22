import { SidebarItem } from "@fibr/builder";
import { useCanvas, type BlockType } from "@fibr/providers";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { DEFAULT_GROUP, DndWrapper, Empty, groupByParentNode } from "../utils";
import { OverviewCard } from "./OverviewCard";
import { OverviewOverlay } from "./OverviewOverlay";
import { Accordion } from "@rafty/ui";
import { useState } from "react";

export type Overview = {
  blocks: BlockType[];
} & Pick<SidebarItem, "action"> &
  Pick<OverviewCard, "enableDragging">;

export function Overview({ action, ...props }: Overview) {
  return (
    <SidebarItem
      name="overview"
      label="Overview"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
      action={action}
    >
      <FieldsRender {...props} />
    </SidebarItem>
  );
}

function FieldsRender({ blocks, enableDragging }: Overview) {
  const [isOpen, setOpen] = useState<string[]>([]);
  const { select, move } = useCanvas(({ move, select }) => ({
    select,
    move,
  }));

  if (blocks.length === 0)
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Empty
          title="No Field"
          description="You can go to palette to add field"
        />
      </div>
    );

  const groups = groupByParentNode(blocks);

  return (
    <DndWrapper
      items={blocks.map(({ id }) => id)}
      onDragStart={({ active }) =>
        select({
          selectedBlockIds: String(active.id),
        })
      }
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          move({
            sourceBlockId: String(active.id),
            targetBlockId: String(over.id),
          });
      }}
    >
      <Accordion type="multiple" value={isOpen} onValueChange={setOpen}>
        {groups[DEFAULT_GROUP]?.map((block) => (
          <OverviewCard
            key={block.id}
            {...block}
            groups={groups}
            onToggle={(value) =>
              setOpen((prev) => {
                if (prev.includes(value))
                  return prev.filter((val) => val !== value);
                return [...prev, value];
              })
            }
            enableDragging={enableDragging}
          />
        ))}
      </Accordion>
      <OverviewOverlay />
    </DndWrapper>
  );
}
