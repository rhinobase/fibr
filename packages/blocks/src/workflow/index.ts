import type { Block } from "@fibr/shared";
import type { ReactNode } from "react";
import {
  LuGitCommit,
  LuGitFork,
  LuGitPullRequestClosed,
  LuGitPullRequestDraft,
} from "react-icons/lu";
import { StartNode, ConditionNode, EndNode, TransitNode } from "./components";
import { NodeSettings } from "./settings";

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

export const workflowBlocks: Record<string, Block[]> = {
  Basic: [
    {
      type: "start",
      label: "Start",
      icon: LuGitPullRequestDraft,
    },
    {
      type: "transit",
      label: "Transit",
      icon: LuGitCommit,
    },
    {
      type: "end",
      label: "End",
      icon: LuGitPullRequestClosed,
    },
  ],
  Operator: [
    {
      type: "condition",
      label: "Condition",
      icon: LuGitFork,
    },
  ],
};
