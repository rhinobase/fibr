import { useThread } from "@fibr/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import type { PropsWithChildren } from "react";

export type TooltipWrapperProps = {
  data: { tooltip?: string };
};

export function TooltipWrapper(props: PropsWithChildren) {
  const {
    data: { tooltip },
  } = useThread<TooltipWrapperProps>();

  if (tooltip)
    return (
      <Tooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent
          align="start"
          className="rounded px-1.5 py-1 leading-none"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );

  return props.children;
}
