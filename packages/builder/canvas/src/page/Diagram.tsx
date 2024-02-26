"use client";
import { type BlockType, useCanvas } from "@fibr/providers";
import { Thread } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  DefaultEdgeOptions,
  FitViewOptions,
  Node,
  NodeDragHandler,
  type NodeTypes,
  OnNodesChange,
  ReactFlow,
  SelectionMode,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

const fitViewOptions: FitViewOptions = {
  padding: 0.5,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export function Diagram() {
  const { resolvedTheme } = useTheme();
  const config = useBlocks((state) => state.config);

  const { nodes, set } = useCanvas(({ schema, set }) => ({
    nodes: schema as Node[],
    set,
  }));

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set({
        func: (nds) => applyNodeChanges(changes, nds as Node[]) as BlockType[],
        shouldEmit: false,
      }),
    [set],
  );

  const nodeTypes = useMemo(
    () =>
      Object.keys(config).reduce<NodeTypes>((prev, name) => {
        prev[name] = Thread;
        return prev;
      }, {}),
    [config],
  );

  const backgroundLineColor = resolvedTheme === "light" ? "#d4d4d8" : "#52525b";

  const onNodeDragStart: NodeDragHandler = useCallback(
    () => set({ func: (value) => value }),
    [set],
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    () => set({ func: (value) => value, shouldEmit: false }),
    [set],
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
        onNodesChange={onNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        translateExtent={[
          [-683, -384],
          [2049, 1152],
        ]}
      >
        <Background
          variant={BackgroundVariant.Lines}
          color={backgroundLineColor}
        />
      </ReactFlow>
    </div>
  );
}
