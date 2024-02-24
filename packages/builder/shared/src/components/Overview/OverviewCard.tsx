import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type BlockType, useCanvas } from "@fibr/providers";
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
import { type CSSProperties, HTMLAttributes } from "react";
import {
  HiChevronRight,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiX,
} from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import { useBlocks } from "../../providers";

const cardClasses = cva(
  "transition-all ease-in-out p-0.5 gap-1 cursor-pointer",
  {
    variants: {
      selected: {
        true: "",
        false: "",
      },
      valid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        valid: true,
        className: "bg-secondary-100 dark:bg-secondary-700",
      },
      {
        selected: false,
        valid: true,
        className:
          "bg-white dark:bg-secondary-950 hover:bg-secondary-100/50 dark:hover:bg-secondary-800",
      },
      {
        valid: false,
        className:
          "bg-red-100/70 text-red-600 dark:bg-red-700/20 dark:text-red-300",
      },
    ],
  },
);

export type OverviewCard = {
  groups?: Record<string, BlockType[] | undefined>;
  onToggle?: (value: string) => void;
  enableDragging?: boolean;
  indent?: number;
} & BlockType;

export function OverviewCard({
  id,
  type,
  groups,
  hidden = false,
  onToggle,
  enableDragging = false,
  selected: isSelected = false,
  indent = 0,
}: OverviewCard) {
  const { validateSchema, Icon } = useBlocks(({ validateSchema, blocks }) => ({
    validateSchema,
    Icon: Object.values(blocks)
      .flat()
      .find((item) => item.type === type)?.icon,
  }));
  const { select, remove, update } = useCanvas(
    ({ select, remove, update }) => ({
      select,
      remove,
      update,
    }),
  );

  const hasChildren = groups ? id in groups : false;
  const isValidType = validateSchema({ type });

  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id, data: { type, indent } });

  const IndentationStyle: CSSProperties = {
    paddingLeft: indent * 12,
  };

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...IndentationStyle,
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

  const handleNodeDelete = eventHandler(() => remove({ blockIds: id }));

  const handleToggleCollapse = eventHandler(() => onToggle?.(id));

  const handleNodeHidden = eventHandler(() => {
    update({
      blockId: id,
      updatedValues: { hidden: !hidden },
    });

    if (hidden) select({ selectedBlockIds: id });
  });

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
          "text-2xs flex items-center gap-1 truncate font-medium",
        )}
      >
        {Icon && <Icon className="size-4 opacity-70" />}
        {id}
        <Text isMuted className="italic">
          ({type})
        </Text>
      </span>
      <div className="flex-1" />
      <HideButton
        hidden={hidden}
        onClick={handleNodeHidden}
        onKeyDown={handleNodeHidden}
      />
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
          className={cardClasses({ selected: isSelected, valid: isValidType })}
          showIcon={false}
          {...draggableProps}
          onClick={handleNodeSelect}
          onKeyDown={handleNodeSelect}
        >
          <CardRender />
        </AccordionTrigger>
        <AccordionContent className="h-full px-0">
          {groups?.[id]?.map((block) => (
            <OverviewCard
              key={block.id}
              {...block}
              groups={groups}
              onToggle={onToggle}
              enableDragging={enableDragging}
              indent={indent + 1}
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
        cardClasses({ selected: isSelected, valid: isValidType }),
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
        "rounded p-0.5",
        className,
      )}
    >
      <HiChevronRight className="transition-transform group-data-[state=open]:rotate-90" />
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
      <MdDragIndicator
        size={13}
        className="dark:text-secondary-300 text-black"
      />
    </span>
  );
}

type HideButton = Omit<HTMLAttributes<HTMLSpanElement>, "hidden"> & {
  hidden: boolean;
};

function HideButton({ className, hidden, ...props }: HideButton) {
  const Icon = hidden ? HiOutlineEye : HiOutlineEyeOff;

  return (
    <span
      {...props}
      className={classNames(
        buttonClasses({
          size: "icon",
          variant: "ghost",
        }),
        hidden && "opacity-40",
        "cursor-pointer p-0.5",
      )}
    >
      <Icon size={14} />
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
      <HiX size={14} />
    </span>
  );
}
