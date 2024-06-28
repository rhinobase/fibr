import { useDroppable } from "@dnd-kit/core";
import { mergeRefs, useClipboard } from "@fibr/builder";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export type WorkflowCanvas = { nodeWrapper?: WeaverProvider["wrapper"] };

export function WorkflowCanvas({ nodeWrapper }: WorkflowCanvas) {
  const { ref } = useClipboard();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas
      ref={mergeRefs(ref, setNodeRef)}
      className="items-stretch justify-normal"
    >
      <WeaverProvider wrapper={nodeWrapper ?? NodeWrapper}>
        <Diagram />
      </WeaverProvider>
      <CustomControls />
    </Canvas>
  );
}
