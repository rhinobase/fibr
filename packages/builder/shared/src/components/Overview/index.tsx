import { SidebarItem } from "@fibr/builder";
import type { ThreadWithIdType } from "@fibr/react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { DndWrapper, Empty } from "../utils";
import { OverviewCard } from "./OverviewCard";

export type Overview = {
  blocks: ThreadWithIdType[];
} & Pick<OverviewCard, "selectBlock" | "removeBlock"> & {
    moveBlock: (startBlockId: string, endblockId: string) => void;
    active: {
      canvas: string | null;
      block: string | null;
    };
  };

export function Overview(props: Overview) {
  return (
    <SidebarItem
      name="overview"
      label="Overview"
      icon={<ListBulletIcon className="h-5 w-5 stroke-2" />}
    >
      <FieldsRender {...props} />
    </SidebarItem>
  );
}

function FieldsRender(props: Overview) {
  if (!props.active.canvas)
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Empty
          title="No Canvas"
          description="You can go to canvas tab to add canvas"
        />
      </div>
    );

  if (props.blocks.length === 0)
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Empty
          title="No Field"
          description="You can go to palette to add field"
        />
      </div>
    );

  return (
    <DndWrapper
      items={props.blocks.map(({ id }) => id)}
      onDragStart={({ active }) => props.selectBlock(String(active.id))}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          props.moveBlock(String(active.id), String(over.id));
      }}
    >
      {props.blocks.map(({ id, type }) => (
        <OverviewCard
          key={id}
          id={id}
          type={type}
          selectBlock={props.selectBlock}
          removeBlock={props.removeBlock}
          isActive={props.active.block === id}
        />
      ))}
    </DndWrapper>
  );
}
