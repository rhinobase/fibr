import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";
import { useSortable } from "@dnd-kit/sortable";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id } = useThread();
  const {
    fields: { selected },
  } = useBlueprint();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: id === "_main" });

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
          selected === id ? "border-primary-500" : "border-secondary-200",
          !isDragging && "transition-all ease-in-out",
          "cursor-pointer bg-white hover:shadow-md",
        )}
      >
        {children}
      </div>
    </QuickActions>
  );
}
