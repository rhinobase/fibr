import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCanvas, type BlockType } from "@fibr/providers";
import { eventHandler } from "@rafty/shared";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
  accordionTriggerClasses,
  buttonClasses,
  classNames,
} from "@rafty/ui";
import { cva } from "class-variance-authority";
import { HTMLAttributes, type CSSProperties } from "react";
import {
  HiChevronRight,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiX,
} from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";

const cardClasses = cva(
  "dark:bg-secondary-950 border bg-white p-2 transition-none gap-1 cursor-pointer",
  {
    variants: {
      selected: {
        true: "border-primary-500 dark:border-primary-400",
        false: "border-secondary-300 dark:border-secondary-700",
      },
    },
  },
);

export type OverviewCard = {
  groups?: Record<string, BlockType[] | undefined>;
  onToggle?: (value: string) => void;
  enableDragging?: boolean;
} & BlockType;

export function OverviewCard({
  id,
  type,
  groups,
  hidden = false,
  onToggle,
  parentNode,
  enableDragging = false,
  selected: isSelected = false,
}: OverviewCard) {
  const { select, remove, update } = useCanvas(
    ({ select, remove, update }) => ({
      select,
      remove,
      update,
    }),
  );

  const hasChildren = groups ? id in groups : false;

  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id: `${id}-${parentNode}`, data: { id, type, parentNode } });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const draggableProps = enableDragging
    ? {
        style: nodeStyle,
        ref: setNodeRef,
      }
    : {};

  const handleNodeSelect = eventHandler(
    () => !hidden && select({ selectedBlockIds: id }),
  );

  const handleNodeDelete = eventHandler(() => remove({ blockId: id }));

  const handleToggleCollapse = eventHandler(() => onToggle?.(id));

  const handleNodeHidden = eventHandler(() =>
    update({
      blockId: id,
      updatedValues: { hidden: !hidden, selected: hidden },
    }),
  );

  // TODO: this is not working
  // if (isDragging) return <div className="bg-primary-500 h-1 w-full" />;

  const CardRender = () => (
    <>
      <span className={classNames(hidden && "opacity-40", "flex items-center")}>
        {enableDragging && <DragHandler {...attributes} {...listeners} />}
        {hasChildren && (
          <CollapseButton
            onClick={handleToggleCollapse}
            onKeyDown={handleToggleCollapse}
          />
        )}
      </span>
      <span
        className={classNames(
          hidden && "opacity-40",
          "text-2xs flex gap-1 truncate font-medium",
        )}
      >
        {id}
        <Text isMuted className="italic">
          ({type})
        </Text>
      </span>
      <div className="flex-1" />
      <span
        className={classNames(
          buttonClasses({
            size: "icon",
            variant: "ghost",
          }),
          hidden && "text-secondary-400",
          "cursor-pointer p-0.5",
        )}
        onClick={handleNodeHidden}
        onKeyDown={handleNodeHidden}
      >
        {hidden ? <HiOutlineEye /> : <HiOutlineEyeOff />}
      </span>
      <DeleteButton
        onClick={handleNodeDelete}
        onKeyDown={handleNodeDelete}
        className={hidden ? "opacity-40" : undefined}
      />
    </>
  );

  if (hasChildren)
    return (
      <AccordionItem value={id}>
        <AccordionTrigger
          className={cardClasses({ selected: isSelected })}
          showIcon={false}
          {...draggableProps}
          onClick={handleNodeSelect}
          onKeyDown={handleNodeSelect}
        >
          <CardRender />
        </AccordionTrigger>
        <AccordionContent className="h-full overflow-visible px-0 pl-4">
          {groups?.[id]?.map((block) => (
            <OverviewCard
              key={block.id}
              {...block}
              groups={groups}
              onToggle={onToggle}
              enableDragging={enableDragging}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );

  return (
    <div
      {...draggableProps}
      className={classNames(
        accordionTriggerClasses(),
        cardClasses({ selected: isSelected }),
      )}
      onClick={handleNodeSelect}
      onKeyDown={handleNodeSelect}
    >
      <CardRender />
    </div>
  );
}

type CollapseButton = Omit<HTMLAttributes<HTMLSpanElement>, "children">;

function CollapseButton({ className, ...props }: CollapseButton) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "rounded px-0.5 py-1",
        className,
      )}
    >
      <HiChevronRight
        size={18}
        className="transition-transform group-data-[state=open]:rotate-90"
      />
    </span>
  );
}

type DragHandler = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  isDragging?: boolean;
};

function DragHandler({ className, isDragging, ...props }: DragHandler) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "rounded px-0.5 py-1",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <MdDragIndicator className="dark:text-secondary-300 text-black" />
    </span>
  );
}

type DeleteButton = HTMLAttributes<HTMLSpanElement>;

function DeleteButton({ className, ...props }: DeleteButton) {
  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({ size: "icon", variant: "ghost" }),
        "cursor-pointer rounded p-0.5 hover:bg-red-200/40 hover:text-red-500 dark:hover:bg-red-300/10 dark:hover:text-red-300",
        className,
      )}
    >
      <HiX size={15} />
    </span>
  );
}
