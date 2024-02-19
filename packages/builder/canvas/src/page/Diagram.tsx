"use client";
import { useCanvas, type BlockWithIdType } from "@fibr/providers";
import { Thread } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  DefaultEdgeOptions,
  FitViewOptions,
  Node,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
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

  const { nodes, set } = useCanvas(({ all, set }) => ({
    nodes: all() as Node[],
    set,
  }));

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set(
        (nds) => applyNodeChanges(changes, nds as Node[]) as BlockWithIdType[],
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
        nodesConnectable
        snapToGrid
        snapGrid={[20, 20]}
        fitView
        onNodesChange={onNodesChange}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={builders}
        proOptions={{ hideAttribution: true }}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnScroll
        panOnDrag={[1, 2]}
      >
        <Background variant={BackgroundVariant.Lines} gap={18} />
      </ReactFlow>
    </div>
  );
}
