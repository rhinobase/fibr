"use client";
import { type BlockType, useCanvas } from "@fibr/providers";
import { Thread } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useBoolean } from "@rafty/ui";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  DefaultEdgeOptions,
  FitViewOptions,
  Node,
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

  const [shouldEmit, toggle] = useBoolean(true);
  const config = useBlocks((state) => state.config);

  const { nodes, set } = useCanvas(({ schema, set }) => ({
    nodes: schema as Node[],
    set,
  }));

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set({
        func: (nds) => applyNodeChanges(changes, nds as Node[]) as BlockType[],
        shouldEmit,
      }),
    [set, shouldEmit],
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

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
        onNodesChange={onNodesChange}
        onNodeDragStart={() => toggle(false)}
        onNodeDragStop={() => toggle(true)}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnScroll
        panOnDrag={[1, 1]}
      >
        <Background
          variant={BackgroundVariant.Lines}
          color={backgroundLineColor}
        />
      </ReactFlow>
    </div>
  );
}
