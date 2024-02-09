import { NodeWrapper } from "./NodeWrapper";
import { Position } from "reactflow";

export function EndNode() {
  return (
    <NodeWrapper
      id="end"
      handles={[{ type: "target", position: Position.Left }]}
    >
      End Node
    </NodeWrapper>
  );
}
