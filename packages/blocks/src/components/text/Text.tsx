import { createThread, useThread } from "@fibr/react";
import { classNames } from "@rafty/ui";
import { TooltipWrapper, type TooltipWrapperProps } from "../TooltipWrapper";
import Markdown from "markdown-to-jsx";

export type Text = TooltipWrapperProps<{
  value: string;
  hidden?: boolean;
}>;

export function Text() {
  // Getting component config
  const { value, hidden } = useThread<Text>();
  return (
    <TooltipWrapper>
      <Markdown className={classNames(hidden && "hidden")}>{value}</Markdown>
    </TooltipWrapper>
  );
}

export const text = createThread<Text>("text");
