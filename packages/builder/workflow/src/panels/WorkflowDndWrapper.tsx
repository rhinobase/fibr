import {
  DndContext,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useFormBuilder } from "@fibr/providers";
import { type PropsWithChildren } from "react";
import { Node, useReactFlow } from "reactflow";

export function WorkflowDndWrapper(props: PropsWithChildren) {
  const sensors = useSensors(useSensor(PointerSensor));
  const { screenToFlowPosition } = useReactFlow();
  const { add, activeCanvas } = useFormBuilder((state) => ({
    add: state.block.add,
    activeCanvas: state.active.canvas,
  }));

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      collisionDetection={pointerWithin}
      onDragEnd={({ active, over }) => {
        if (over?.id === "canvas" && active.rect.current.translated) {
          const { top, left } = active.rect.current.translated;
          const position = screenToFlowPosition({ x: left, y: top });
          const data = active.data.current;
          if (activeCanvas && data)
            add<Omit<Node, "id">>(activeCanvas, {
              type: data.type,
              position,
              data: data.presets,
            });
        }
      }}
    >
      {props.children}
    </DndContext>
  );
}
