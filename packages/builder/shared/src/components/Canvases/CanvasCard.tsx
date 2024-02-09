import { CanvasType, useFormBuilder } from "@fibr/providers";
import type { ThreadType } from "@fibr/react";
import { eventHandler } from "@rafty/shared";
import { Button, Text, classNames } from "@rafty/ui";
import { MdDelete } from "react-icons/md";

export type CanvasCard = {
  id: string;
  canvas: ThreadType<CanvasType>;
};

export function CanvasCard({ id, canvas: { title } }: CanvasCard) {
  const { select, activeCanvas } = useFormBuilder(({ canvas, active }) => ({
    activeCanvas: active.canvas,
    select: canvas.select,
  }));
  const handleSelect = eventHandler(() => select(id));

  return (
    <div
      className={classNames(
        "dark:bg-secondary-900 flex cursor-pointer select-none items-center gap-1 rounded border bg-white p-2 drop-shadow transition-all ease-in-out hover:drop-shadow-md",
        activeCanvas === id
          ? "border-primary-500"
          : "border-secondary-300 dark:border-secondary-700",
      )}
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <p className="text-2xs flex gap-1 truncate font-medium">
        {title}
        <Text isMuted className="italic">
          ({id})
        </Text>
      </p>
      <div className="flex-1" />
      <DeleteButton id={id} />
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  const remove = useFormBuilder(({ canvas }) => canvas.remove);

  const handleRemove = eventHandler(() => remove(id));

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="rounded p-0.5"
      onClick={handleRemove}
      onKeyDown={handleRemove}
    >
      <MdDelete />
    </Button>
  );
}
