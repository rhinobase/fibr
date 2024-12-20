import { DndContext, pointerWithin } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useCanvas } from "@fibr/builder";
import type { PropsWithChildren } from "react";
import { type Node, useReactFlow } from "reactflow";

export function WorkflowDndWrapper(props: PropsWithChildren) {
  const { screenToFlowPosition } = useReactFlow();
  const add = useCanvas(({ add }) => add);

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      collisionDetection={pointerWithin}
      onDragEnd={({ active, over }) => {
        if (over?.id === "canvas" && active.rect.current.translated) {
          const { top, left } = active.rect.current.translated;
          const position = screenToFlowPosition({ x: left, y: top });
          const data = active.data.current;
          if (data?.type)
            add<Node & { type: string }>({
              blockData: {
                type: data.type,
                position,
                ...data.presets,
              },
            });
        }
      }}
    >
      {props.children}
    </DndContext>
  );
}
