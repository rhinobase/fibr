import { Edge, Node } from "reactflow";

export type Diagram = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export function Diagram(props: Diagram) {
  return <div>Diagram</div>;
}
