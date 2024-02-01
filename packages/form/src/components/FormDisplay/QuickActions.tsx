import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@rafty/ui";
import { PropsWithChildren, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import {
  MdOutlineAddToPhotos,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineDelete,
} from "react-icons/md";
import { useBlueprint } from "../../providers";

export type QuickActions = PropsWithChildren;

export function QuickActions({ children }: QuickActions) {
  const { id } = useThread();
  const { active } = useBlueprint();

  const [isHover, setHover] = useState(false);

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={isHover || active.field === id}
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
    schema,
    fields: { all, move, remove, findIndex, duplicate, select },
    active,
  } = useBlueprint();

  const formId = active.form;

  if (!formId) throw new Error("Unable to find an active form!");

  const index = findIndex(formId, id);

  if (index == null) return <></>;

  const moveComponent = (direction: Direction) => {
    const components = all(formId);
    select(id);
    move(formId, id, components[index + direction].id);
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
      {index < (schema.get(formId)?.blocks.size ?? 0) - 1 && (
        <ActionButton
          name="Move down"
          icon={MdOutlineArrowDownward}
          action={() => moveComponent(Direction.DOWN)}
        />
      )}
      <ActionButton
        name="Duplicate file"
        icon={MdOutlineAddToPhotos}
        action={() => duplicate(formId, id)}
      />
      <ActionButton
        name="Delete visual field"
        icon={MdOutlineDelete}
        action={() => remove(formId, id)}
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
