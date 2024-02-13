import { useCanvas } from "@fibr/providers";
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
import { PropsWithChildren, useEffect, useRef, useState } from "react";
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
  const activeBlock = useCanvas(({ active }) => active.block);

  const [isHover, setHover] = useState(false);

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={isHover || activeBlock === id}
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
  const { select, activeCanvas, updateId } = useCanvas(({ block, active }) => ({
    select: block.select,
    activeCanvas: active.canvas,
    updateId: block.updateId,
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
    if (activeCanvas && ref.current)
      updateId(activeCanvas, id, ref.current.value);

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
  const { id } = useThread();
  const {
    schema,
    block: { all, move, remove, findIndex, duplicate, select },
    activeCanvas,
  } = useCanvas(({ schema, block, active }) => ({
    schema,
    block,
    activeCanvas: active.canvas,
  }));

  if (!activeCanvas) throw new Error("Unable to find an active canvas!");

  const index = findIndex(activeCanvas, id);

  if (index == null) return <></>;

  const moveComponent = (direction: Direction) => {
    const components = all(activeCanvas);
    select(id);
    move(activeCanvas, id, components[index + direction].id);
  };

  return (
    <div className="flex w-max gap-1 rounded-md border bg-white p-1 shadow">
      {index > 0 && (
        <ActionButton
          name="Move up"
          icon={MdOutlineArrowUpward}
          action={() => moveComponent(Direction.UP)}
        />
      )}
      {index < (schema.get(activeCanvas)?.blocks.size ?? 0) - 1 && (
        <ActionButton
          name="Move down"
          icon={MdOutlineArrowDownward}
          action={() => moveComponent(Direction.DOWN)}
        />
      )}
      <ActionButton
        name="Duplicate file"
        icon={MdOutlineAddToPhotos}
        action={() => duplicate(activeCanvas, id)}
      />
      <ActionButton
        name="Delete visual field"
        icon={MdOutlineDelete}
        action={() => remove(activeCanvas, id)}
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
