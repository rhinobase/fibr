import {
  DndContext,
  type DndContextProps,
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
  type SortableContextProps,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export type DndWrapper = Pick<SortableContextProps, "items" | "children"> &
  Pick<DndContextProps, "onDragStart" | "onDragEnd">;

export function DndWrapper({ onDragStart, onDragEnd, ...props }: DndWrapper) {
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
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext {...props} strategy={verticalListSortingStrategy} />
    </DndContext>
  );
}
