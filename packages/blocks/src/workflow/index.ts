import type { Block } from "@fibr/shared";
import type { ReactNode } from "react";
import {
  LuGitCommit,
  LuGitFork,
  LuGitPullRequestClosed,
  LuGitPullRequestDraft,
} from "react-icons/lu";
import { MdCropFree, MdInput, MdOutput } from "react-icons/md";
import { StartNode, ConditionNode, EndNode, TransitNode } from "./components";
import { NodeSettings } from "./settings";
import { Node, Position } from "reactflow";

export const workflowConfig: Record<
  string,
  { builder: () => ReactNode; settings: () => ReactNode }
> = {
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
  Default: [
    {
      type: "default",
      label: "Default",
      icon: MdCropFree,
    },
    {
      type: "input",
      label: "Input",
      icon: MdInput,
    },
    {
      type: "output",
      label: "Output",
      icon: MdOutput,
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
