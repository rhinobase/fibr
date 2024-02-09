import { NodeWrapper } from "./NodeWrapper";
import { Position } from "reactflow";

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
