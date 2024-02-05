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
import type { PropsWithChildren } from "react";
import { useBlueprint } from "../providers";

export type DndWrapper = Pick<SortableContextProps, "items">;

export function DndWrapper(props: PropsWithChildren<DndWrapper>) {
  const { moveBlock, selectBlock, activeForm } = useBlueprint(
    ({ blocks, active }) => ({
      moveBlock: blocks.move,
      selectBlock: blocks.select,
      activeForm: active.form,
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
        if (over && active.id !== over.id && activeForm)
          moveBlock(activeForm, String(active.id), String(over.id));
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
