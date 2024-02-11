"use client";
import { useFormBuilder } from "@fibr/providers";
import { Thread, ThreadWithIdType } from "@fibr/react";
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
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  addEdge,
  applyNodeChanges,
  type NodeTypes,
  OnEdgesChange,
  applyEdgeChanges,
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

  const { nodes, edges, set } = useFormBuilder(({ block: { all, set } }) => ({
    nodes: all("nodes") as Node[],
    edges: all("edges") as Edge[],
    set,
  }));

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set(
        "nodes",
        (nds) => applyNodeChanges(changes, nds as Node[]) as ThreadWithIdType[],
      ),
    [set],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      set(
        "edges",
        (edgs) =>
          applyEdgeChanges(changes, edgs as Edge[]) as ThreadWithIdType[],
      ),
    [set],
  );

  const onConnect = useCallback(
    (params: Connection) =>
      set(
        "edges",
        (eds) => addEdge(params, eds as Edge[]) as ThreadWithIdType[],
      ),
    [set],
  );

  const builders = useMemo(
    () =>
      Object.keys(config).reduce<NodeTypes>((prev, name) => {
        prev[name] = Thread;
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
