import type { BlockType } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@rafty/ui";
import { useState, type PropsWithChildren } from "react";
import { ActionButtons } from "./ActionButtons";
import { EditIdField } from "./EditIdField";

export type QuickActions = PropsWithChildren;

export function QuickActions({ children }: QuickActions) {
  const { selected = false } = useThread<BlockType>();
  const [isHover, setHover] = useState(false);

  return (
    <HoverCard
      openDelay={50}
      closeDelay={100}
      open={isHover || selected}
      onOpenChange={setHover}
    >
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        side="right"
        sideOffset={10}
        align="start"
        className="space-y-1.5 border-none bg-transparent p-0 shadow-none transition-opacity data-[state=closed]:ease-out data-[state=open]:ease-in dark:bg-transparent"
      >
        <EditIdField />
        <ActionButtons />
      </HoverCardContent>
    </HoverCard>
  );
}
