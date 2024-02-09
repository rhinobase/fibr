"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Background,
  DefaultEdgeOptions,
  Edge,
  FitViewOptions,
  Node,
  NodeChange,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  applyNodeChanges,
  Controls,
} from "reactflow";
import { NODE_TYPES } from "./nodes";

const fitViewOptions: FitViewOptions = {
  padding: 0.5,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export type Diagram = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export function Diagram(props: Diagram) {
  const [nodes, setNodes] = useState(props.initialNodes);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to run this callback when setNodes changes
  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        const parsedChanges = changes.reduce<NodeChange[]>((prev, cur) => {
          const validChange =
            cur.type !== "remove" ||
            (cur.type === "remove" &&
              nds.find((n) => n.id === cur.id)?.data?.deletable);

          if (validChange) prev.push(cur);

          return prev;
        }, []);
        return applyNodeChanges(parsedChanges, nds);
      }),
    [setNodes],
  );

  useEffect(() => {
    setNodes(props.initialNodes);
  }, [props.initialNodes]);

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={props.initialEdges}
        nodesConnectable={false}
        onNodesChange={onNodesChange}
        // fitView
        // fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={NODE_TYPES}
        proOptions={{ hideAttribution: true }}
        panOnScroll
        selectionOnDrag
        panOnDrag={[1, 2]}
        selectionMode={SelectionMode.Partial}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
