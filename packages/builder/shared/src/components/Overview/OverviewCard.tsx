import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BaseBlockWithIdType, useCanvas } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Text,
  classNames,
} from "@rafty/ui";
import { CSSProperties } from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";

export type OverviewCard = {
  id: string;
  type: string;
  groups?: Record<string, BaseBlockWithIdType[] | undefined>;
};

export function OverviewCard({ id, type, groups }: OverviewCard) {
  const { active, select, remove } = useCanvas(
    ({ select, remove, active }) => ({
      active,
      select,
      remove,
    }),
  );

  const hasChildren = groups ? id in groups : false;

  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNodeSelect = eventHandler(() => select(id));

  const handleNodeDelete = eventHandler(() => remove(id));

  if (hasChildren)
    return (
      <Accordion type="multiple">
        <AccordionItem value={id}>
          <AccordionTrigger>
            <div
              ref={setNodeRef}
              style={nodeStyle}
              className={classNames(
                "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow hover:drop-shadow-md",
                !isDragging && "transition-shadow",
                active.includes(id)
                  ? "border-primary-500"
                  : "border-secondary-300 dark:border-secondary-700",
              )}
              onClick={handleNodeSelect}
              onKeyDown={handleNodeSelect}
            >
              {/*Drag Handler Button */}
              <Button
                {...attributes}
                {...listeners}
                variant="ghost"
                size="icon"
                className={classNames(
                  "rounded px-0.5 py-1",
                  isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
              >
                <MdDragIndicator className="text-black" />
              </Button>
              <span className="text-2xs flex gap-1 truncate font-medium">
                {id}
                <Text isMuted className="italic">
                  ({type})
                </Text>
              </span>
              <div className="flex-1" />
              {/* Delete Button */}
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded p-0.5"
                onClick={handleNodeDelete}
                onKeyDown={handleNodeDelete}
              >
                <MdDelete />
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {groups?.[id]?.map((groupProps) => (
              <OverviewCard {...groupProps} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow hover:drop-shadow-md",
        !isDragging && "transition-shadow",
        active.includes(id)
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={handleNodeSelect}
      onKeyDown={handleNodeSelect}
    >
      {/*Drag Handler Button */}
      <Button
        {...attributes}
        {...listeners}
        variant="ghost"
        size="icon"
        className={classNames(
          "rounded px-0.5 py-1",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <MdDragIndicator className="text-black" />
      </Button>
      <span className="text-2xs flex gap-1 truncate font-medium">
        {id}
        <Text isMuted className="italic">
          ({type})
        </Text>
      </span>
      <div className="flex-1" />
      {/* Delete Button */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded p-0.5"
        onClick={handleNodeDelete}
        onKeyDown={handleNodeDelete}
      >
        <MdDelete />
      </Button>
    </div>
  );
}
