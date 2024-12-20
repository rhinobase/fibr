import { useDroppable } from "@dnd-kit/core";
import { mergeRefs, useClipboard } from "@fibr/builder";
import { Canvas, CustomControls } from "@fibr/shared";
import { Blueprint } from "duck-form";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";

export type WorkflowCanvas = { nodeWrapper?: Blueprint<unknown>["wrapper"] };

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
      <Blueprint wrapper={nodeWrapper}>
        <Diagram />
      </Blueprint>
      <CustomControls />
    </Canvas>
  );
}
