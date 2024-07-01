import {
  DEFAULT_GROUP,
  groupByParentNode,
  useCanvas,
  SidebarItem,
  SidebarTrigger,
} from "@fibr/builder";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Accordion, Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { DndWrapper, Empty } from "../utils";
import { OverviewCard } from "./OverviewCard";
import { OverviewOverlay } from "./OverviewOverlay";

export type Overview = Pick<OverviewCard, "enableDragging"> & {
  headerAction?: ReactNode;
};

export function Overview({ headerAction, ...props }: Overview) {
  return (
    <SidebarItem
      name="overview"
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <SidebarTrigger value="overview">
                <ListBulletIcon className="h-5 w-5 stroke-2" />
              </SidebarTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>Overview</TooltipContent>
        </Tooltip>
      }
    >
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Overview</h4>
          {headerAction}
        </div>
        <hr className="dark:border-secondary-700" />
      </div>
      <div className="h-full overflow-y-auto">
        <div className="flex h-full flex-col px-3 pb-3">
          <FieldsRender {...props} />
        </div>
      </div>
    </SidebarItem>
  );
}

function FieldsRender({ enableDragging }: Omit<Overview, "headerAction">) {
  const [isOpen, setOpen] = useState<string[]>([]);

  const { schema, selectBlock, moveBlock } = useCanvas(
    ({ schema, move, select }) => ({
      schema,
      selectBlock: select,
      moveBlock: move,
    }),
  );

  const parents = useMemo(() => {
    const blocks = schema.filter(({ selected }) => selected);

    const tree = schema.reduce<Record<string, string | undefined>>(
      (prev, { id, parentNode }) => {
        prev[id] = parentNode;

        return prev;
      },
      {},
    );

    const nodes = new Set<string>();

    for (const block of blocks) {
      let node = block.parentNode;

      while (node != null) {
        nodes.add(node);
        node = tree[node];
      }
    }

    return Array.from(nodes);
  }, [schema]);

  useEffect(() => {
    if (parents.length > 0)
      setOpen((prev) => Array.from(new Set([...prev, ...parents])));
  }, [parents]);

  if (schema.length === 0)
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Empty
          title="No Field"
          description="You can go to palette to add field"
        />
      </div>
    );

  const groups = groupByParentNode(schema);

  return (
    <DndWrapper
      items={schema.map(({ id }) => id)}
      onDragStart={({ active }) =>
        selectBlock({
          selectedBlockIds: String(active.id),
        })
      }
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          moveBlock({
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
