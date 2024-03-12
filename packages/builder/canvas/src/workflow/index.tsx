import { useDroppable } from "@dnd-kit/core";
import { useClipboard } from "@fibr/providers";
import { WeaverProvider } from "@fibr/react";
import { Canvas, CustomControls } from "@fibr/shared";
import { mergeRefs } from "@rafty/ui";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { NodeWrapper } from "./NodeWrapper";

export function WorkflowCanvas() {
  const { ref } = useClipboard();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas
      ref={mergeRefs(ref, setNodeRef)}
      className="items-stretch justify-normal"
    >
      <WeaverProvider wrapper={NodeWrapper}>
        <Diagram />
      </WeaverProvider>
      <CustomControls />
    </Canvas>
  );
}
