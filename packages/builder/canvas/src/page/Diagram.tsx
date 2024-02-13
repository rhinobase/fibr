"use client";
import { useCanvas } from "@fibr/providers";
import { Thread, type ThreadWithIdType } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  DefaultEdgeOptions,
  Edge,
  FitViewOptions,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
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
  const config = useBlocks((state) => state.config);

  const { nodes, edges, set } = useCanvas(({ block: { all, set } }) => ({
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
        prev[name] = (props) => <Thread {...props} {...props.data} />;
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
        <Background variant={BackgroundVariant.Lines} gap={18} />
      </ReactFlow>
    </div>
  );
}
