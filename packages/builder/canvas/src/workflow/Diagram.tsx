"use client";
import { useCanvas, type BlockType } from "@fibr/providers";
import { Thread } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
  ReactFlow,
  SelectionMode,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useStoreApi,
  type DefaultEdgeOptions,
  type Edge,
  type EdgeTypes,
  type FitViewOptions,
  type Node,
  type NodeDragHandler,
  type NodeTypes,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type ProOptions,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomEdge } from "./CustomEdge";

const MIN_DISTANCE = 200;

export function Diagram() {
  const store = useStoreApi();

  const config = useBlocks(({ config }) => config);

  const { nodes, edges, set } = useCanvas(({ schema, set }) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    for (const block of schema) {
      if (block.type === "edge") edges.push(block as Edge);
      else nodes.push(block as Node);
    }

    return {
      nodes,
      edges,
      set,
    };
  });

  const customEdgeTypes: EdgeTypes = { edge: CustomEdge };

  const fitViewOptions: FitViewOptions = {
    padding: 0.5,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    type: "edge",
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      set({
        func: (nds) => applyNodeChanges(changes, nds as Node[]) as BlockType[],
        shouldEmit: false,
      }),
    [set],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      set({
        func: (edgs) =>
          applyEdgeChanges(changes, edgs as Edge[]) as BlockType[],
        shouldEmit: false,
      }),
    [set],
  );

  const onConnect: OnConnect = useCallback(
    (params) =>
      set({
        func: (eds) =>
          addEdge({ ...params, type: "edge" }, eds as Edge[]) as BlockType[],
      }),
    [set],
  );

  const customNodeTypes: NodeTypes = useMemo(
    () =>
      Object.keys(config).reduce<NodeTypes>((prev, name) => {
        prev[name] = Thread;
        return prev;
      }, {}),
    [config],
  );

  const getClosestEdge = useCallback(
    (node: Node) => {
      const { nodeInternals } = store.getState();
      const storeNodes = Array.from(nodeInternals.values());

      const closestNode = storeNodes.reduce<{
        distance: number;
        node: Node | null;
      }>(
        (res, n) => {
          if (n.id !== node.id && n.positionAbsolute && node.positionAbsolute) {
            const dx = n.positionAbsolute.x - node.positionAbsolute.x;
            const dy = n.positionAbsolute.y - node.positionAbsolute.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < res.distance && d < MIN_DISTANCE) {
              res.distance = d;
              res.node = n;
            }
          }

          return res;
        },
        {
          distance: Number.MAX_VALUE,
          node: null,
        },
      );

      if (!closestNode.node) {
        return null;
      }

      let closeNodeIsSource = false;

      if (closestNode.node.positionAbsolute && node.positionAbsolute)
        closeNodeIsSource =
          closestNode.node.positionAbsolute.x < node.positionAbsolute.x;

      return {
        id: closeNodeIsSource
          ? `${closestNode.node.id}-${node.id}`
          : `${node.id}-${closestNode.node.id}`,
        type: "edge",
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
        className: "",
      };
    },
    [store],
  );

  const onNodeDragStart: NodeDragHandler = useCallback(
    () => set({ func: (value) => value }),
    [set],
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set({
        func: (es: (BlockType & Edge)[]) => {
          const nextEdges = es.filter((e) => e.className !== "temp");

          if (
            closeEdge &&
            !nextEdges.find(
              (ne) =>
                ne.source === closeEdge.source &&
                ne.target === closeEdge.target,
            )
          ) {
            closeEdge.className = "temp";
            nextEdges.push(closeEdge);
          }
          return nextEdges;
        },
        shouldEmit: false,
      });
    },
    [getClosestEdge, set],
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set({
        func: (es: (BlockType & Edge)[]) => {
          const nextEdges = es.filter((e) => e.className !== "temp");

          if (
            closeEdge &&
            !nextEdges.find(
              (ne) =>
                ne.source === closeEdge.source &&
                ne.target === closeEdge.target,
            )
          )
            nextEdges.push(closeEdge);

          return nextEdges;
        },
        shouldEmit: false,
      });
    },
    [getClosestEdge, set],
  );

  const proOptions: ProOptions = {
    hideAttribution: true,
  };

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesConnectable
        nodeTypes={customNodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        edgeTypes={customEdgeTypes}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnScroll
        panOnDrag={[1, 2]}
        proOptions={proOptions}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
