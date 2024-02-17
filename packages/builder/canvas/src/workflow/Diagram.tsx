"use client";
import { useCanvas } from "@fibr/providers";
import { Thread, ThreadWithIdType } from "@fibr/react";
import { useBlocks } from "@fibr/shared";
import { useCallback, useMemo } from "react";
import {
  Background,
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
  useStoreApi,
  NodeDragHandler,
} from "reactflow";
import "reactflow/dist/style.css";

const fitViewOptions: FitViewOptions = {
  padding: 0.5,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const MIN_DISTANCE = 200;

export function Diagram() {
  const store = useStoreApi();

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

  const nodeTypes = useMemo(
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
        type: "default",
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
        className: "",
      };
    },
    [store],
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set("edges", (es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        ) {
          closeEdge.className = "temp";
          nextEdges.push(closeEdge);
        }
        return nextEdges;
      });
    },
    [getClosestEdge, set],
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_, node) => {
      const closeEdge = getClosestEdge(node);

      set("edges", (es) => {
        const nextEdges = es.filter((e) => e.className !== "temp");

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target,
          )
        )
          nextEdges.push(closeEdge);

        return nextEdges;
      });
    },
    [getClosestEdge, set],
  );

  return (
    <div className="flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesConnectable
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        selectionMode={SelectionMode.Partial}
        selectionOnDrag
        panOnScroll
        panOnDrag={[1, 2]}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
