import {
  useCanvas,
  type BaseBlockWithIdType,
  type BlockFilters,
} from "@fibr/providers";
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
import { HiPencil } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import {
  MdOutlineAddToPhotos,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineDelete,
} from "react-icons/md";

export type QuickActions = PropsWithChildren;

export function QuickActions({ children }: QuickActions) {
  const { id } = useThread();
  const active = useCanvas(({ active }) => active);

  const [isHover, setHover] = useState(false);

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={isHover || active.includes(id)}
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
  const { id } = useThread();
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
    select(id);
  });

  const onSubmit = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Updating the value
    if (ref.current) updateId(id, ref.current.value);

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
  const { id, parentNode } = useThread<BaseBlockWithIdType>();
  const { all, move, remove, duplicate, select } = useCanvas(
    ({ all, move, remove, duplicate, select }) => ({
      all,
      move,
      remove,
      duplicate,
      select,
    }),
  );

  const filters: BlockFilters = { parentNode };
  const blocks = all(filters);
  const index = blocks.findIndex((block) => block.id === id);

  if (index === -1) return;

  const onMove = (direction: Direction) => {
    select(id);
    move(id, blocks[index + direction].id);
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
        name="Duplicate file"
        icon={MdOutlineAddToPhotos}
        action={() => duplicate(id)}
      />
      <ActionButton
        name="Delete visual field"
        icon={MdOutlineDelete}
        action={() => remove(id)}
      />
    </div>
  );
}

type ActionButton = {
  name: string;
  icon: IconType;
  action: () => void;
};

function ActionButton({ name, icon: Icon, action }: ActionButton) {
  const manageAction = eventHandler(action);

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded p-1"
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
