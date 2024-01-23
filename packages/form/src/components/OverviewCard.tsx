import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ThreadWithIdType } from "@fibr/react";

export function OverviewCard(props: ThreadWithIdType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-secondary-300 dark:border-secondary-700 dark:bg-secondary-900 flex w-80 items-center rounded border bg-white p-2 drop-shadow"
    >
      <p className="text-xs font-medium leading-none">Field</p>
    </div>
  );
}
