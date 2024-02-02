import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";
import { useSortable } from "@dnd-kit/sortable";
import { eventHandler } from "@rafty/shared";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id, type } = useThread();
  const {
    active,
    blocks: { select },
  } = useBlueprint();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const onSelect = eventHandler(() => select(id));

  if (type === "form")
    return (
      <div
        onClick={onSelect}
        className={classNames(
          "w-full cursor-pointer rounded-md border bg-white p-5 hover:shadow-md",
          active.block === id ? "border-primary-500" : "border-secondary-200",
        )}
      >
        {children}
      </div>
    );

  const nodeStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <QuickActions>
      <div
        ref={setNodeRef}
        style={nodeStyle}
        {...attributes}
        {...listeners}
        className={classNames(
          "w-full select-none rounded-md border p-5",
          active.block === id ? "border-primary-500" : "border-secondary-200",
          !isDragging && "transition-all ease-in-out",
          "cursor-pointer bg-white hover:shadow-md",
        )}
      >
        {children}
      </div>
    </QuickActions>
  );
}
