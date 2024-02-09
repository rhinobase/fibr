import { Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export function StartNode() {
  return (
    <NodeWrapper
      id="start"
      handles={[{ type: "source", position: Position.Right }]}
    >
      Start Node
    </NodeWrapper>
  );
}
