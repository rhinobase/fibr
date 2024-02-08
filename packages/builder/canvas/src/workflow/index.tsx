import { Canvas } from "@fibr/shared";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { useDroppable } from "@dnd-kit/core";

export function WorkflowCanvas(props: Diagram) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <Canvas ref={setNodeRef} className="items-stretch justify-normal">
      <Diagram {...props} />
    </Canvas>
  );
}
