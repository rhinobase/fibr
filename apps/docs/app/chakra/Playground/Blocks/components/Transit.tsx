import { Position } from "reactflow";
import { NodeWrapper } from "../utils/NodeWrapper";

export function TransitNode() {
  return (
    <NodeWrapper
      id="transit"
      handles={[
        { type: "target", position: Position.Left },
        { type: "source", position: Position.Right },
      ]}
    >
      Transit Node
    </NodeWrapper>
  );
}
