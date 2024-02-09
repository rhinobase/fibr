import {
  DndContext,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { type PropsWithChildren } from "react";
import { useReactFlow } from "reactflow";

export function WorkflowDndWrapper(props: PropsWithChildren) {
  const sensors = useSensors(useSensor(PointerSensor));
  const { screenToFlowPosition } = useReactFlow();

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      collisionDetection={pointerWithin}
      onDragEnd={({ active, over }) => {
        if (over?.id === "canvas" && active.rect.current.translated) {
          const { top, left } = active.rect.current.translated;
          console.log(screenToFlowPosition({ x: left, y: top }));
        }
      }}
    >
      {props.children}
    </DndContext>
  );
}
