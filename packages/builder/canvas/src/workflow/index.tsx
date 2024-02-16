import { Canvas, WorkflowControls } from "@fibr/shared";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";
import { WeaverProvider } from "@fibr/react";
import { NodeWrapper } from "./NodeWrapper";

export function WorkflowCanvas() {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas ref={setNodeRef} className="items-stretch justify-normal">
      <WeaverProvider wrapper={NodeWrapper}>
        <Diagram />
      </WeaverProvider>
      <WorkflowControls />
    </Canvas>
  );
}
