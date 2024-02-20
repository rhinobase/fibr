import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockWithIdType, useCanvas } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Text,
  buttonClasses,
  classNames,
} from "@rafty/ui";
import { type CSSProperties, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { MdDelete, MdDragIndicator } from "react-icons/md";

export type OverviewCard = {
  id: string;
  type: string;
  groups?: Record<string, BlockWithIdType[] | undefined>;
};

export function OverviewCard({ id, type, groups }: OverviewCard) {
  const [accordionValue, setAccordionValue] = useState<string | undefined>();
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
  } = useSortable({ id, data: { type } });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleNodeSelect = eventHandler(() => select({ blockId: id }));

  const handleNodeDelete = eventHandler(() => remove({ blockId: id }));

  const handleToggleCollapse = eventHandler(() =>
    setAccordionValue((prev) => (prev === id ? undefined : id)),
  );

  if (hasChildren)
    return (
      <Accordion
        type="single"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value={id}>
          <AccordionTrigger
            className={classNames(
              "dark:bg-secondary-900 border bg-transparent bg-white p-2 transition-none dark:bg-transparent",
              active.includes(id)
                ? "border-primary-500"
                : "border-secondary-300 dark:border-secondary-700",
            )}
            showIcon={false}
            style={nodeStyle}
            ref={setNodeRef}
            onClick={handleNodeSelect}
            onKeyDown={handleNodeSelect}
          >
            <span
              {...attributes}
              {...listeners}
              className={classNames(
                buttonClasses({ size: "icon", variant: "ghost" }),
                "rounded px-0.5 py-1",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
            >
              <MdDragIndicator className="text-black" />
            </span>
            <span
              className={classNames(
                buttonClasses({ size: "icon", variant: "ghost" }),
                "rounded px-0.5 py-1",
              )}
              onClick={handleToggleCollapse}
              onKeyDown={handleToggleCollapse}
            >
              <HiChevronRight className="text-secondary-500 transition-transform group-data-[state=open]:rotate-90" />
            </span>
            <Text className="text-2xs flex gap-1 truncate px-1 font-medium">
              {id}
              <span className="italic">({type})</span>
            </Text>
            <div className="flex-1" />
            <span
              className={classNames(
                buttonClasses({ size: "icon", variant: "ghost" }),
                "rounded p-0.5",
              )}
              onClick={handleNodeDelete}
              onKeyDown={handleNodeDelete}
            >
              <MdDelete />
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pl-4">
            {groups?.[id]?.map((groupProps) => (
              <OverviewCard key={groupProps.id} {...groupProps} />
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
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 border bg-white p-2",
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
