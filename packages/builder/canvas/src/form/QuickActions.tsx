import { useCanvas, type BlockType } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  InputField,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  classNames,
  useBoolean,
} from "@rafty/ui";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { HiPencil, HiOutlineEyeOff } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import {
  MdOutlineAddToPhotos,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineDelete,
} from "react-icons/md";
import type { Node } from "reactflow";

export type QuickActions = PropsWithChildren;

export function QuickActions({ children }: QuickActions) {
  const { selected = false } = useThread<BlockType>();
  const [isHover, setHover] = useState(false);

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={isHover || selected}
      onOpenChange={setHover}
    >
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        side="right"
        sideOffset={10}
        align="start"
        className="space-y-1.5 border-none bg-transparent p-0 shadow-none transition-opacity data-[state=closed]:ease-out data-[state=open]:ease-in"
      >
        <IdEditField />
        <QuickActionButtons />
      </HoverCardContent>
    </HoverCard>
  );
}

function IdEditField() {
  const { id, parentNode } = useThread<Node>();
  const [isEditable, toggle] = useBoolean(false);
  const ref = useRef<HTMLInputElement>(null);
  const { select, updateId } = useCanvas(({ select, updateId }) => ({
    select,
    updateId,
  }));

  useEffect(() => {
    if (isEditable && ref.current) ref.current.focus();
  }, [isEditable]);

  const handleClick = eventHandler(() => {
    toggle(true);
    select({ selectedBlockIds: { id, parentNode } });
  });

  const onSubmit = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Updating the value
    if (ref.current)
      updateId({ currentBlockId: id, newBlockId: ref.current.value });

    toggle(false);
  };

  return (
    <div
      className={classNames(
        "bg-secondary-200/70 text-secondary-600 w-max rounded-md",
        !isEditable && "px-2 py-1.5",
      )}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      {isEditable ? (
        <InputField
          size="sm"
          ref={ref}
          defaultValue={id}
          className="w-[100px] bg-white font-mono"
          onBlur={onSubmit}
          onKeyDown={(event) => {
            const { key } = event;
            if (key === "Escape" || key === "Enter") onSubmit(event);
          }}
        />
      ) : (
        <div className="flex items-center gap-1.5">
          <code className="text-sm">{id}</code>
          <HiPencil />
        </div>
      )}
    </div>
  );
}

enum Direction {
  UP = -1,
  DOWN = 1,
}

function QuickActionButtons() {
  const { id, parentNode } = useThread<BlockType>();
  const { blocks, move, remove, duplicate, select, update } = useCanvas(
    ({ schema, move, remove, duplicate, select, update }) => ({
      blocks: schema.filter((block) => block.parentNode === parentNode),
      move,
      remove,
      duplicate,
      select,
      update,
    }),
  );

  const index = blocks.findIndex((block) => block.id === id);

  if (index === -1) return;

  const onMove = (direction: Direction) => {
    select({ selectedBlockIds: { id, parentNode } });
    move({ sourceBlockId: id, targetBlockId: blocks[index + direction].id });
  };

  return (
    <div className="flex w-max gap-1 rounded-md border bg-white p-1 shadow">
      {index > 0 && (
        <ActionButton
          name="Move up"
          icon={MdOutlineArrowUpward}
          action={() => onMove(Direction.UP)}
        />
      )}
      {index < blocks.length - 1 && (
        <ActionButton
          name="Move down"
          icon={MdOutlineArrowDownward}
          action={() => onMove(Direction.DOWN)}
        />
      )}
      <ActionButton
        name="Hidden"
        icon={HiOutlineEyeOff}
        action={() => update({ blockId: id, updatedValues: { hidden: true } })}
      />
      <ActionButton
        name="Duplicate file"
        icon={MdOutlineAddToPhotos}
        action={() => duplicate({ originalBlockId: id })}
      />
      <ActionButton
        name="Delete visual field"
        icon={MdOutlineDelete}
        action={() => remove({ blockId: id, parentNode })}
        className="hover:bg-red-200/40 hover:text-red-500 dark:hover:bg-red-300/10 dark:hover:text-red-300"
      />
    </div>
  );
}

type ActionButton = {
  name: string;
  icon: IconType;
  action: () => void;
} & Pick<Button, "className">;

function ActionButton({ name, icon: Icon, action, className }: ActionButton) {
  const manageAction = eventHandler(action);

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={classNames("rounded p-1", className)}
          onClick={manageAction}
          onKeyDown={manageAction}
        >
          <Icon size={18} />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        isArrow={false}
        sideOffset={7}
        className="text-2xs rounded px-1.5 py-1.5 leading-none"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}
