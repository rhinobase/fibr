import { useThread } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { classNames } from "@rafty/ui";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";
import { useSortable } from "@dnd-kit/sortable";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id } = useThread();
  const {
    fields: { select, selected },
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
    <QuickActions>
      <div
        ref={setNodeRef}
        style={nodeStyle}
        {...attributes}
        {...listeners}
        className={classNames(
          "w-full select-none rounded-md border p-5 text-center",
          selected === id ? "border-primary-500" : "border-secondary-200",
          !isDragging && "transition-all ease-in-out",
          "cursor-pointer bg-white hover:shadow-md",
        )}
        onClick={selectField}
        onKeyDown={selectField}
      >
        {children}
      </div>
    </QuickActions>
  );
}
