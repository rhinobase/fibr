"use client";
import { useFormBuilder } from "@fibr/providers";
import { type ThreadWithIdType } from "@fibr/react";
import { useSource } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  Connection,
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
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./Node";

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
      Object.entries(config).reduce<NodeTypes>((prev, [name]) => {
        prev[name] = CustomNode;
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
        snapToGrid
        snapGrid={[20, 20]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={builders}
        proOptions={{ hideAttribution: true }}
        selectionOnDrag
        minZoom={1}
        selectionMode={SelectionMode.Partial}
      >
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
}
