import type { PropsWithChildren } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  DndContext,
  closestCenter,
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
import { useBlueprint } from "../providers";

export type DndWrapper = Pick<SortableContextProps, "items">;

export function DndWrapper(props: PropsWithChildren<DndWrapper>) {
  const {
    fields: { move, select },
    active: { form: formId },
  } = useBlueprint();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && formId) {
      move(formId, String(active.id), String(over.id));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => select(String(active.id))}
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
