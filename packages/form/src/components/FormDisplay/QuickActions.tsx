import { useThread } from "@fibr/react";
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import { PropsWithChildren } from "react";
import { HiPencil } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import {
  MdOutlineAddToPhotos,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineDelete,
} from "react-icons/md";
import { useBlueprint } from "../../providers";
import { eventHandler } from "@rafty/shared";

export type QuickActions = PropsWithChildren;

export function QuickActions({ children }: QuickActions) {
  const { id } = useThread();
  const {
    fields: { selected },
  } = useBlueprint();

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={selected === id ? true : undefined}
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

  return (
    <div className="bg-secondary-200/70 text-secondary-600 flex items-center gap-1.5 rounded-md px-2 py-1.5">
      <code className="text-sm">{id}</code>
      <HiPencil />
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
    fields: { fields, all, move, remove, findIndex, duplicate, select },
  } = useBlueprint();

  const index = findIndex(id);

  if (index == null) return <></>;

  const moveComponent = (direction: Direction) => {
    const components = all();
    select(id);
    move(id, components[index + direction].id);
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
      {index < fields.size - 1 && (
        <ActionButton
          name="Move down"
          icon={MdOutlineArrowDownward}
          action={() => moveComponent(Direction.DOWN)}
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
