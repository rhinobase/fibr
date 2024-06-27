import type { Block, Config } from "@fibr/builder";
import {
  LuGitCommit,
  LuGitFork,
  LuGitPullRequestClosed,
  LuGitPullRequestDraft,
} from "react-icons/lu";
import { type Node, Position } from "reactflow";
import {
  ConditionNode,
  CustomEdge,
  EndNode,
  StartNode,
  TransitNode,
} from "./components";
import { NodeSettings } from "./settings";

export const workflowConfig: Record<string, Config> = {
  start: {
    builder: StartNode,
    settings: NodeSettings,
  },
  transit: {
    builder: TransitNode,
    settings: NodeSettings,
  },
  condition: {
    builder: ConditionNode,
    settings: NodeSettings,
  },
  end: {
    builder: EndNode,
    settings: NodeSettings,
  },
  edge: {
    builder: CustomEdge,
    metadata: {
      node_type: "edge",
    },
  },
};

export const workflowBlocks: Record<string, Block<Partial<Node>>[]> = {
  Basic: [
    {
      type: "start",
      label: "Start",
      icon: LuGitPullRequestDraft,
      presets: {
        sourcePosition: Position.Right,
        resizing: false,
      },
    },
    {
      type: "transit",
      label: "Transit",
      icon: LuGitCommit,
      presets: {
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        resizing: false,
      },
    },
    {
      type: "end",
      label: "End",
      icon: LuGitPullRequestClosed,
      presets: {
        targetPosition: Position.Left,
        resizing: false,
      },
    },
  ],
  Operator: [
    {
      type: "condition",
      label: "Condition",
      icon: LuGitFork,
      presets: {
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        resizing: false,
      },
    },
  ],
};
