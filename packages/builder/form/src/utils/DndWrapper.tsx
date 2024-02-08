import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  SortableContextProps,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFormBuilder } from "@fibr/providers";
import type { PropsWithChildren } from "react";

export type DndWrapper = Pick<SortableContextProps, "items">;

export function DndWrapper(props: PropsWithChildren<DndWrapper>) {
  const { moveBlock, selectBlock, activeCanvas } = useFormBuilder(
    ({ block, active }) => ({
      moveBlock: block.move,
      selectBlock: block.select,
      activeCanvas: active.canvas,
    }),
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id && activeCanvas)
          moveBlock(activeCanvas, String(active.id), String(over.id));
      }}
      onDragStart={({ active }) => selectBlock(String(active.id))}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext
        items={props.items}
        strategy={verticalListSortingStrategy}
      >
        {props.children}
      </SortableContext>
    </DndContext>
  );
}
