import { useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, PropsWithChildren } from "react";
import { useBlueprint } from "../../providers";
import { QuickActions } from "./QuickActions";
import { useSortable } from "@dnd-kit/sortable";

export function FieldWrapper({ children }: PropsWithChildren) {
  const { id, type } = useThread();
  const { active } = useBlueprint();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  if (type === "form")
    return (
      <div className="w-full cursor-pointer select-none rounded-md border bg-white p-5 hover:shadow-md">
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
          active.field === id ? "border-primary-500" : "border-secondary-200",
          !isDragging && "transition-all ease-in-out",
          "cursor-pointer bg-white hover:shadow-md",
        )}
      >
        {children}
      </div>
    </QuickActions>
  );
}
