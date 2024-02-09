"use client";
import { useFormBuilder } from "@fibr/providers";
import { ThreadWithIdType } from "@fibr/react";
import { useSource } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  Connection,
  Controls,
  DefaultEdgeOptions,
  Edge,
  FitViewOptions,
  Node,
  NodeChange,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  addEdge,
  applyNodeChanges,
  useEdgesState,
  type NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

const fitViewOptions: FitViewOptions = {
  padding: 0.5,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export function Diagram() {
  const config = useSource((state) => state.config);

  const {
    nodes,
    edges: canvasEdges,
    set,
  } = useFormBuilder(({ block: { all, set } }) => ({
    nodes: all("nodes") as Node[],
    edges: all("edges") as Edge[],
    set,
  }));

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set((tds) => {
        const nds = tds as Node[];

        const parsedChanges = changes.reduce<NodeChange[]>((prev, cur) => {
          const validChange =
            cur.type !== "remove" ||
            (cur.type === "remove" &&
              nds.find((n) => n.id === cur.id)?.data?.deletable);

          if (validChange) prev.push(cur);

          return prev;
        }, []);
        return applyNodeChanges(parsedChanges, nds) as ThreadWithIdType[];
      }),
    [set],
  );

  // const [nodes, , onNodesChange] = useNodesState(canvasNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(canvasEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // useEffect(() => {
  //   console.log(canvasNodes, nodes);
  // }, [canvasNodes]);

  const builders = useMemo(
    () =>
      Object.entries(config).reduce<NodeTypes>((prev, [name, { builder }]) => {
        prev[name] = builder;
        return prev;
      }, {}),
    [config],
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesConnectable
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={builders}
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
