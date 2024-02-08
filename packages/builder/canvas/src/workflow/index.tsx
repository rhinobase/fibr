import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";
import { Canvas } from "@fibr/shared";

export function WorkflowCanvas(props: Diagram) {
  return (
    <Canvas className="items-stretch justify-normal">
      <ReactFlowProvider>
        <Diagram {...props} />
      </ReactFlowProvider>
    </Canvas>
  );
}
