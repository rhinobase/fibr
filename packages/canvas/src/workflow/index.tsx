import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";
import { Diagram } from "./Diagram";

export function WorkflowCanvas(props: Diagram) {
  return (
    <ReactFlowProvider>
      <Diagram {...props} />
    </ReactFlowProvider>
  );
}
