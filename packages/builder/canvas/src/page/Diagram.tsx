import { useBlocks, useCanvas, type BlockType } from "@fibr/builder";
import { DuckField } from "duck-form";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  SelectionMode,
  applyNodeChanges,
  type CoordinateExtent,
  type DefaultEdgeOptions,
  type FitViewOptions,
  type Node,
  type NodeDragHandler,
  type NodeTypes,
  type OnNodesChange,
  type ProOptions,
} from "reactflow";
import "reactflow/dist/style.css";

export function Diagram() {
  const { resolvedTheme } = useTheme();

  const config = useBlocks(({ config }) => config);

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

  const nodeTypes: NodeTypes = useMemo(
    () =>
      Object.keys(config).reduce<NodeTypes>((prev, name) => {
        prev[name] = DuckField;
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

  const fitViewOptions: FitViewOptions = {
    padding: 0.5,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };

  const proOptions: ProOptions = {
    hideAttribution: true,
  };

  const translateExtent: CoordinateExtent = [
    [-683, -384],
    [2049, 1152],
  ];

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
        proOptions={proOptions}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        translateExtent={translateExtent}
      >
        <Background
          variant={BackgroundVariant.Lines}
          color={backgroundLineColor}
        />
      </ReactFlow>
    </div>
  );
}
