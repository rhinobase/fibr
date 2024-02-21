import { Canvas, WorkflowControls } from "@fibr/shared";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";
import { WeaverProvider } from "@fibr/react";
import { NodeWrapper } from "./NodeWrapper";
import { useCanvas } from "@fibr/providers";

export function WorkflowCanvas() {
  const select = useCanvas(({ select }) => select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas
      ref={setNodeRef}
      className="items-stretch justify-normal"
      onClick={() => select({ selectedBlockIds: [] })}
    >
      <WeaverProvider wrapper={NodeWrapper}>
        <Diagram />
      </WeaverProvider>
      <WorkflowControls />
    </Canvas>
  );
}
