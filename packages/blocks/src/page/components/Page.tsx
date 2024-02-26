import { useDroppable } from "@dnd-kit/core";

export type Page = { id: string };

export function Page() {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-secondary-50 dark:bg-secondary-950 dark:border-secondary-800 h-[768px] w-[1366px] border"
    >
      Page Canvas
    </div>
  );
}
