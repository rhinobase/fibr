import { Position } from "reactflow";
import { NodeWrapper } from "../utils/NodeWrapper";

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
