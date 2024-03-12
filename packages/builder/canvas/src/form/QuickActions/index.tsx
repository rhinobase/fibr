import type { BlockType } from "@fibr/providers";
import { useThread } from "@fibr/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@rafty/ui";
import { useState, type PropsWithChildren } from "react";
import { ActionButtons } from "./ActionButtons";
import { EditIdField } from "./EditIdField";

export function QuickActions(props: PropsWithChildren) {
  const { selected } = useThread<BlockType>();
  const [isHover, setHover] = useState(false);

  return (
    <div>
      {/* this extra div is to avoid the margin top from parent component */}
      <HoverCard
        openDelay={50}
        closeDelay={100}
        open={isHover || selected}
        onOpenChange={setHover}
      >
        <HoverCardTrigger asChild>{props.children}</HoverCardTrigger>
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
    </div>
  );
}
