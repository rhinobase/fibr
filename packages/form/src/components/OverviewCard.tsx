import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ThreadWithIdType } from "@fibr/react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { Button, classNames } from "@rafty/ui";
import { eventHandler } from "@rafty/shared";
import { useBlueprint } from "../providers";
import { CSSProperties } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type OverviewCard = ThreadWithIdType & {
  icon: JSX.Element;
};

export function OverviewCard({ id, type }: ThreadWithIdType) {
  const {
    fields: { selected, select },
  } = useBlueprint();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectField = eventHandler(() => select(id));

  return (
    <div
      ref={setNodeRef}
      style={nodeStyle}
      className={classNames(
        "dark:bg-secondary-900 flex w-80 select-none items-center gap-1 rounded-md border bg-white p-2 drop-shadow",
        selected === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={selectField}
      onKeyDown={selectField}
    >
      <DragHandler
        attributes={attributes}
        listeners={listeners}
        isDragging={isDragging}
      />
      <p className="truncate text-xs font-medium capitalize">{`${type} - ${id}`}</p>
      <div className="flex-1" />
      <DeleteButton id={id} />
    </div>
  );
}

type DragHandler = {
  isDragging: boolean;
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

function DragHandler({ isDragging, attributes, listeners }: DragHandler) {
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      className={classNames(
        "rounded px-0.5 py-1",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      <MdDragIndicator className="text-black" />
    </Button>
  );
}

type DeleteButton = {
  id: string;
};

function DeleteButton({ id }: DeleteButton) {
  const {
    fields: { remove },
  } = useBlueprint();

  const deleteNode = eventHandler((event) => {
    event.preventDefault();
    event.stopPropagation();
    remove(id);
  });

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="rounded p-0.5"
      onClick={deleteNode}
      onKeyDown={deleteNode}
    >
      <MdDelete />
    </Button>
  );
}
