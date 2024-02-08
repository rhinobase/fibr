import { Canvas } from "@fibr/shared";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";

export function WorkflowCanvas(props: Diagram) {
  return (
    <Canvas className="items-stretch justify-normal">
      <ReactFlowProvider>
        <Diagram {...props} />
      </ReactFlowProvider>
    </Canvas>
  );
}
