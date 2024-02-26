import { SidebarItem } from "@fibr/builder";
import { useCanvas } from "@fibr/providers";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Accordion } from "@rafty/ui";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_GROUP, DndWrapper, Empty, groupByParentNode } from "../utils";
import { OverviewCard } from "./OverviewCard";
import { OverviewOverlay } from "./OverviewOverlay";

export type Overview = Pick<SidebarItem, "action"> &
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

function FieldsRender({ enableDragging }: Overview) {
  const [isOpen, setOpen] = useState<string[]>([]);
  const { schema, select, move } = useCanvas(({ schema, move, select }) => ({
    schema,
    select,
    move,
  }));

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
