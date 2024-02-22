import { useDroppable } from "@dnd-kit/core";
import { useCanvas } from "@fibr/providers";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export function WorkflowCanvas() {
  const select = useCanvas(({ select }) => select);
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas
      ref={setNodeRef}
      className="items-stretch justify-normal"
      onClick={() => select({ selectedBlockIds: null })}
    >
      <WeaverProvider wrapper={NodeWrapper}>
        <Diagram />
      </WeaverProvider>
      <CustomControls />
    </Canvas>
  );
}
