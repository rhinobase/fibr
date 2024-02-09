import { NodeWrapper } from "./NodeWrapper";
import { Position } from "reactflow";

export function ConditionNode() {
  return (
    <NodeWrapper
      id="end"
      handles={[
        { type: "target", position: Position.Left },
        { type: "source", position: Position.Right },
        { type: "source", position: Position.Right },
      ]}
    >
      End Node
    </NodeWrapper>
  );
}
