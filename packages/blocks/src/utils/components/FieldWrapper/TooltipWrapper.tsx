import { Tooltip, TooltipContent, TooltipTrigger } from "@rafty/ui";
import { PropsWithChildren } from "react";
import { useThread } from "@fibr/react";

export type TooltipWrapperProps = {
  data: { tooltip?: string };
};

export type TooltipWrapper = PropsWithChildren;

export function TooltipWrapper({ children }: TooltipWrapper) {
  const {
    data: { tooltip },
  } = useThread<TooltipWrapperProps>();

  if (tooltip)
    return (
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          align="start"
          className="rounded px-1.5 py-1 leading-none"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );

  return children;
}
