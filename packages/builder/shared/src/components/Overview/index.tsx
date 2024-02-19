import { SidebarItem } from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { DEFAULT_GROUP, DndWrapper, Empty, groupByParentNode } from "../utils";
import { OverviewCard } from "./OverviewCard";
import type { BaseBlockWithIdType } from "@fibr/providers";

export type Overview = {
  blocks: BaseBlockWithIdType[];
} & Pick<OverviewCard, "onSelect" | "onDelete"> & {
    onMove: (from: string, to: string) => void;
    active: string[];
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
  if (props.blocks.length === 0)
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Empty
          title="No Field"
          description="You can go to palette to add field"
        />
      </div>
    );

  const groups = groupByParentNode(props.blocks);

  return (
    <DndWrapper
      items={props.blocks.map(({ id }) => id)}
      onDragStart={({ active }) => props.onSelect(String(active.id))}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          props.onMove(String(active.id), String(over.id));
      }}
    >
      {groups[DEFAULT_GROUP]?.map(({ id, type }) => (
        <OverviewCard
          key={id}
          id={id}
          type={type}
          onSelect={props.onSelect}
          onDelete={props.onDelete}
          isActive={props.active.includes(id)}
        />
      ))}
    </DndWrapper>
  );
}
